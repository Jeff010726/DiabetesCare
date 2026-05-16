const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav-links");

if (header) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastScrollY = window.scrollY;
  let ticking = false;

  const setHeaderState = () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    header.classList.toggle("is-scrolled", currentScrollY > 24);
    header.classList.toggle("is-hidden", scrollingDown && currentScrollY > 160);

    lastScrollY = currentScrollY;
    ticking = false;
  };

  if (!reduceMotion.matches) {
    requestAnimationFrame(() => header.classList.add("is-ready"));
  } else {
    header.classList.add("is-ready");
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(setHeaderState);
        ticking = true;
      }
    },
    { passive: true },
  );

  setHeaderState();
}

if (nav) {
  const indicator = document.createElement("span");
  const items = [...nav.querySelectorAll(":scope > a, :scope > .nav-menu > button")];
  const path = window.location.pathname.split("/").pop() || "index.html";

  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  nav.prepend(indicator);

  const isTrainingPage = path === "pump-training.html" || path === "cgm-training.html";
  const current =
    items.find((item) => item.getAttribute("href") === path) ||
    (isTrainingPage ? nav.querySelector(".nav-menu > button") : null) ||
    items[0];

  const moveIndicator = (item) => {
    if (!item || window.matchMedia("(max-width: 980px)").matches) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    nav.style.setProperty("--indicator-x", `${itemRect.left - navRect.left}px`);
    nav.style.setProperty("--indicator-width", `${itemRect.width}px`);
    nav.classList.add("has-indicator");
  };

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => moveIndicator(item));
    item.addEventListener("focus", () => moveIndicator(item));
  });

  nav.addEventListener("mouseleave", () => moveIndicator(current));
  window.addEventListener("resize", () => moveIndicator(current));

  requestAnimationFrame(() => moveIndicator(current));
}
