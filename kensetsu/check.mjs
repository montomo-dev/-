// data.js の書き忘れを見つける。使い方: node kensetsu/check.mjs [data.jsのパス]
// 送る前に一度実行し、エラーが0件になってからスクリーンショットを撮る。
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const path = process.argv[2] || fileURLToPath(new URL("./data.js", import.meta.url));
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(path, "utf8"), sandbox);
const site = sandbox.window.SITE;

const errors = [];
const warnings = [];
const need = (cond, msg) => { if (!cond) errors.push(msg); };

if (!site) {
  console.error("window.SITE が見つかりません: " + path);
  process.exit(1);
}

for (const key of ["name", "business", "location", "catch", "lead"]) {
  need(typeof site[key] === "string" && site[key].trim() !== "", `${key} が空です`);
}
need(Array.isArray(site.serviceArea) && site.serviceArea.length > 0, "serviceArea（対応地域）が空です");

const count = (list, key, min, max, label) => {
  const n = Array.isArray(list) ? list.length : 0;
  need(n >= min && n <= max, `${label}は${min}〜${max}件にしてください（今は${n}件）`);
  (list || []).forEach((item, i) => {
    for (const k of key) need(item[k] && String(item[k]).trim() !== "", `${label}${i + 1}件目の ${k} が空です`);
  });
};
count(site.services, ["title", "desc"], 3, 6, "対応工事");
count(site.works, ["title", "place"], 1, 6, "施工例");
count(site.flow, ["title", "desc"], 3, 6, "工事の流れ");
count(site.faq || [], ["q", "a"], 0, 5, "よくある質問");

const c = site.contact || {};
need(c.tel || c.instagram || c.line || c.mail, "相談窓口（tel / instagram / line / mail）が1つもありません");
if (c.tel) need(/^[0-9+\-() ]{9,}$/.test(c.tel), `電話番号の形式を確認してください: ${c.tel}`);
for (const k of ["instagram", "line"]) if (c[k]) need(/^https:\/\//.test(c[k]), `${k} は https:// から始まるURLにしてください`);

// 書き換え忘れ・テンプレートの穴
const text = JSON.stringify(site);
if (/【|】/.test(text)) errors.push("【 】の書き換え忘れがあります");
if (/〇〇|△△|□□|000-0000-0000/.test(text)) warnings.push("サンプル用の仮の地名・電話番号が残っています（相手用に作るときは書き換え）");
if (c.instagram === "https://www.instagram.com/") warnings.push("InstagramのURLが仮のままです");
const flowText = JSON.stringify(site.flow || []);
for (const [word, key] of [["Instagram", "instagram"], ["LINE", "line"], ["電話", "tel"], ["メール", "mail"]]) {
  if (flowText.includes(word) && !c[key]) warnings.push(`工事の流れに「${word}」とありますが、相談窓口に ${key} がありません`);
}
(site.works || []).forEach((w, i) => { if (!w.photo) warnings.push(`施工例${i + 1}件目の写真が未設定です（枠だけ表示されます）`); });
if (/お客様の声|満足度|No\.?1|実績\d+件/.test(text)) warnings.push("口コミ・実績・順位の表現があります。相手の公開情報で確認できたものだけか見直してください");

for (const w of warnings) console.log("注意: " + w);
for (const e of errors) console.log("エラー: " + e);
console.log(`結果: エラー ${errors.length}件 / 注意 ${warnings.length}件`);
process.exit(errors.length ? 1 : 0);
