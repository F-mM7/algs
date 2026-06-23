// data.js が先に読み込まれ、グローバルに algSets を定義する（モジュールではなく通常スクリプト）。
const VISUALCUBE = "https://visualcube.api.cubing.net/visualcube.php";
const DEFAULT_SIZE = 160;
const DEFAULT_BG = "2a2a2a"; // カード背景色に合わせる

// カテゴリ共通の設定を取り出す（algs 以外のキー）。
function categoryDefaults(set) {
  const { category, algs, ...rest } = set;
  return rest;
}

// VisualCube の画像 URL を組み立てる。
function visualcubeURL(cfg) {
  const params = new URLSearchParams();
  params.set("fmt", "svg");
  params.set("size", String(cfg.size ?? DEFAULT_SIZE));
  params.set("bg", cfg.bg ?? DEFAULT_BG);
  params.set("pzl", String(cfg.pzl ?? 3));
  if (cfg.view) params.set("view", cfg.view);
  if (cfg.stage) params.set("stage", cfg.stage);
  if (cfg.sch) params.set("sch", cfg.sch);
  if (cfg.arw) params.set("arw", cfg.arw);
  // case= は「手順を解く前の状態」＝認識図を表示する。
  if (cfg.alg) params.set("case", cfg.alg);
  return `${VISUALCUBE}?${params.toString()}`;
}

function renderCard(cfg) {
  const card = document.createElement("div");
  card.className = "alg-card";

  const img = document.createElement("img");
  img.className = "alg-view";
  img.src = visualcubeURL(cfg);
  img.alt = cfg.name;
  img.loading = "lazy";

  const name = document.createElement("div");
  name.className = "alg-name";
  name.textContent = cfg.name;

  const moves = document.createElement("code");
  moves.className = "alg-moves";
  moves.textContent = cfg.alg;

  card.append(img, name, moves);
  return card;
}

function renderCategory(set) {
  const section = document.createElement("section");
  section.className = "category";

  const heading = document.createElement("h2");
  heading.textContent = set.category;
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "alg-grid";

  const defaults = categoryDefaults(set);
  for (const item of set.algs) {
    // カテゴリ設定を土台に、alg 個別の設定で上書き。
    grid.appendChild(renderCard({ ...defaults, ...item }));
  }

  section.appendChild(grid);
  return section;
}

function render() {
  const app = document.getElementById("app");
  app.textContent = "";
  for (const set of algSets) {
    app.appendChild(renderCategory(set));
  }
  app.removeAttribute("aria-busy");
}

render();
