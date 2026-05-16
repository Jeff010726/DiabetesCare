const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const pages = [
  "index.html",
  "classes.html",
  "physicians.html",
  "insurance.html",
  "pump-training.html",
  "cgm-training.html",
  "contact.html",
];

const cases = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 900 },
];

const shouldScreenshot = process.env.SCREENSHOT === "1";

(async () => {
  const browser = await chromium.launch();

  if (shouldScreenshot) {
    fs.mkdirSync(".verification", { recursive: true });
  }

  for (const item of cases) {
    for (const pageName of pages) {
      const page = await browser.newPage({ viewport: { width: item.width, height: item.height } });
      const pagePath = `file://${path.resolve(pageName).replace(/\\/g, "/")}`;
      const errors = [];

      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(pagePath, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(650);

      if (shouldScreenshot && pageName === "index.html") {
        await page.screenshot({ path: `.verification/header-${item.name}.png`, fullPage: false });
      }

      const initial = await page.locator(".site-header").boundingBox();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const initialBorderWidth = await page
        .locator(".site-header")
        .evaluate((node) => getComputedStyle(node).borderBottomWidth);

      await page.mouse.wheel(0, 500);
      await page.waitForTimeout(220);
      const hidden = await page.locator(".site-header").evaluate((node) => node.classList.contains("is-hidden"));
      const scrolledBorderWidth = await page
        .locator(".site-header")
        .evaluate((node) => getComputedStyle(node).borderBottomWidth);

      await page.mouse.wheel(0, -500);
      await page.waitForTimeout(260);
      const shown = await page.locator(".site-header").evaluate((node) => !node.classList.contains("is-hidden"));
      let submenuVisible = true;

      if (item.name === "desktop") {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(320);
        await page.locator(".nav-menu > button").hover();
        await page.waitForTimeout(360);
        submenuVisible = await page
          .locator(".nav-submenu")
          .evaluate((node) => {
            const style = getComputedStyle(node);
            const rect = node.getBoundingClientRect();
            return style.pointerEvents === "auto" && Number(style.opacity) > 0.95 && rect.height > 0;
          });
      }

      console.log(
        `${pageName} ${item.name}: header=${Math.round(initial.width)}x${Math.round(initial.height)}, overflow=${overflow}, border=${initialBorderWidth}->${scrolledBorderWidth}, hidden=${hidden}, shown=${shown}, submenu=${submenuVisible}, errors=${errors.length}`,
      );

      if (
        errors.length ||
        overflow > 1 ||
        initialBorderWidth !== "0px" ||
        scrolledBorderWidth === "0px" ||
        !hidden ||
        !shown ||
        !submenuVisible
      ) {
        if (errors.length) {
          console.log(errors.join("\n"));
        }
        process.exitCode = 1;
      }

      await page.close();
    }
  }

  await browser.close();
})();
