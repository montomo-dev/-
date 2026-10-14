// data.js の内容をページに流し込む。文言の編集は data.js で行う。
(function () {
  const site = window.SITE;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // 空欄のときはボタン自体を出さない
  const contactLinks = (c) => {
    const links = [];
    if (c.tel) links.push({ label: "電話で相談", sub: c.tel, href: "tel:" + c.tel.replace(/[^0-9+]/g, ""), kind: "tel" });
    if (c.instagram) links.push({ label: "InstagramのDMで相談", href: c.instagram, kind: "ig" });
    if (c.line) links.push({ label: "LINEで相談", href: c.line, kind: "line" });
    if (c.mail) links.push({ label: "メールで相談", sub: c.mail, href: "mailto:" + c.mail, kind: "mail" });
    return links;
  };

  const button = (link, extra) => {
    const a = el("a", "btn btn-" + link.kind + (extra ? " " + extra : ""));
    a.href = link.href;
    if (link.kind !== "tel" && link.kind !== "mail") {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.append(el("span", "btn-label", link.label));
    if (link.sub) a.append(el("span", "btn-sub", link.sub));
    return a;
  };

  document.title = site.name + "｜" + site.business + "（制作サンプル）";

  document.querySelectorAll("[data-field]").forEach((node) => {
    node.textContent = site[node.dataset.field] || "";
  });

  document.getElementById("heroArea").textContent =
    site.location + "の" + site.business;

  const heroCatch = document.getElementById("heroCatch");
  site.catch.split("\n").forEach((line, i) => {
    if (i > 0) heroCatch.append(document.createElement("br"));
    heroCatch.append(line);
  });

  const services = document.getElementById("services-list");
  site.services.forEach((s, i) => {
    const li = el("li", "service-item");
    li.append(el("span", "service-no", String(i + 1).padStart(2, "0")));
    li.append(el("h3", "", s.title));
    li.append(el("p", "", s.desc));
    services.append(li);
  });

  const works = document.getElementById("works-list");
  site.works.forEach((w) => {
    const li = el("li", "work-item");
    const figure = el("figure", "work-photo");
    if (w.photo) {
      const img = document.createElement("img");
      img.src = w.photo;
      img.alt = w.title;
      img.loading = "lazy";
      figure.append(img);
    } else {
      figure.classList.add("is-empty");
      figure.append(el("span", "", "施工写真をここに掲載"));
    }
    li.append(figure);
    const body = el("div", "work-body");
    body.append(el("p", "work-place", w.place));
    body.append(el("h3", "", w.title));
    if (w.note) body.append(el("p", "work-note", w.note));
    li.append(body);
    works.append(li);
  });

  const flow = document.getElementById("flow-list");
  site.flow.forEach((f, i) => {
    const li = el("li", "flow-item");
    li.append(el("span", "flow-step", "STEP " + (i + 1)));
    li.append(el("h3", "", f.title));
    li.append(el("p", "", f.desc));
    flow.append(li);
  });

  const area = document.getElementById("area-list");
  site.serviceArea.forEach((a) => area.append(el("li", "", a)));

  const faqSection = document.getElementById("faq");
  if (!site.faq || site.faq.length === 0) {
    faqSection.remove();
  } else {
    const faq = document.getElementById("faq-list");
    site.faq.forEach((f) => {
      const wrap = el("div", "faq-item");
      wrap.append(el("dt", "", f.q));
      wrap.append(el("dd", "", f.a));
      faq.append(wrap);
    });
  }

  const links = contactLinks(site.contact);
  document.getElementById("contactHours").textContent = site.contact.hours
    ? "受付時間：" + site.contact.hours
    : "";
  const contactActions = document.getElementById("contactActions");
  links.forEach((l) => contactActions.append(button(l)));

  const heroActions = document.getElementById("heroActions");
  if (links[0]) heroActions.append(button(links[0]));
  const toWorks = el("a", "btn btn-ghost", "施工例を見る");
  toWorks.href = "#works";
  heroActions.append(toWorks);

  // スマホでは画面下に最初の相談窓口を固定表示
  const mobileCta = document.getElementById("mobileCta");
  if (links[0]) mobileCta.append(button(links[0], "btn-block"));
  else mobileCta.remove();
})();
