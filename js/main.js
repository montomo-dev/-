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

// サンプルなので送信はしない。何も起きないと壊れて見えるため、その旨を画面に出す
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  note.textContent = "入力ありがとうございます。これはサンプルのため、内容は送信されません。実際の制作ではこの部分をメール送信などにつなぎます。";
  note.hidden = false;
});
