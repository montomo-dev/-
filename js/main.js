const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
function setMenuOpen(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  navToggle.textContent = open ? "×" : "☰";
}
navToggle.addEventListener("click", () => setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true"));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    navToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!nav.contains(event.target) && !navToggle.contains(event.target)) setMenuOpen(false);
});
window.addEventListener("resize", () => { if (window.innerWidth > 720) setMenuOpen(false); });
