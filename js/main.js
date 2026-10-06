const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

function setNav(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
}

navToggle.addEventListener("click", () => {
  setNav(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setNav(false);
    navToggle.focus();
  }
});

// サンプルなので送信はしない。押しても無反応にならないよう、その旨を表示する
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formStatus").textContent =
    "これはサンプルです。実際のサイトでは、ここで送信が完了します。";
});
