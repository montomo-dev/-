const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

function setNavOpen(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
}

navToggle.addEventListener("click", () => {
  setNavOpen(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setNavOpen(false);
  });
});

// サンプルのため送信はしない。押しても無反応にならないよう、その旨を画面に出す
const form = document.querySelector(".contact-form");
const formNote = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent = "これはホームページ制作のサンプルです。入力内容は送信・保存されません。";
});
