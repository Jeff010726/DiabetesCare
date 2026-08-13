import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) process.exit(0);

const indexHtml = fs.readFileSync(indexPath);
fs.writeFileSync(path.join(distDir, "404.html"), indexHtml);

const routes = [
  "classes",
  "pump-training",
  "cgm",
  "glp1-training",
  "providers",
  "coverage",
  "recipes",
  "contact",
  "contact-thank-you",
  "member",
  "member-thank-you",
  "booking",
  "booking-redirect",
  "booking-whatsapp",
  "sign-up-class",
  "class-agreement",
  "sign-up-class-thank-you",
];

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), indexHtml);
}
