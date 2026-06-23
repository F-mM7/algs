// ============================================================================
// alg データ。ここを編集して自分の覚えている手順を追加・削除します。
//
// 図は VisualCube (https://visualcube.api.cubing.net) の画像で表示します。
// 構造:
//   algSets = カテゴリの配列
//   各カテゴリ = { category, ...VisualCube設定, algs: [ { name, alg, ...上書き } ] }
//
// 設定はカテゴリ単位で指定し、各 alg で個別に上書きできます
// （= alg ごとに見せ方を変えられる）。
//
// VisualCube 設定:
//   pzl   : パズルサイズ。3 = 3x3, 4 = 4x4, 2 = 2x2 など（既定 3）
//   view  : "plan" = 上面図（OLL/PLL 向き） / 省略 = 斜めの立体図（F2L 等向き）
//   stage : 強調するパーツ。"oll" | "pll" | "f2l" | "cross" | "ll" | "cll"
//           | "ell" | "ocll" | "coll" など。省略すると全面表示
//   sch   : 配色スキーム（例 "wrgyob"）。省略で標準
//   arw   : PLL 用の矢印指定（例 "U0U2-s10,U2U6-s10"）
//   size  : 画像サイズ(px)（既定 160）
//   bg    : 背景色 hex（既定はカード色に合わせて "2a2a2a"）
//
// alg は「解く前の状態（認識図）」として表示されます（VisualCube の case=）。
// ============================================================================

const algSets = [
  {
    category: "PLL",
    pzl: 3,
    view: "plan",
    stage: "pll",
    algs: [
      { name: "T perm", alg: "R U R' U' R' F R2 U' R' U' R U R' F'" },
      { name: "Y perm", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
      // ↓ ここに自分の PLL を追加
    ],
  },
  {
    category: "OLL",
    pzl: 3,
    view: "plan",
    stage: "oll",
    algs: [
      { name: "Sune (OLL 27)", alg: "R U R' U R U2 R'" },
      { name: "Antisune (OLL 26)", alg: "R U2 R' U' R U' R'" },
      // ↓ ここに自分の OLL を追加
    ],
  },
  {
    category: "F2L",
    pzl: 3,
    stage: "f2l",
    algs: [
      { name: "右手 基本", alg: "U R U' R'" },
      { name: "左手 基本", alg: "U' L' U L" },
      // ↓ ここに自分の F2L を追加
    ],
  },
  {
    category: "4x4 パリティ",
    pzl: 4,
    algs: [
      {
        name: "OLL parity",
        alg: "Rw U2 x Rw U2 Rw U2' Rw' U2 Lw U2 Rw' U2' Rw U2 Rw' U2' Rw'",
      },
      // ↓ ここに自分の 4x4 手順を追加
    ],
  },
  // ↓ 新しいカテゴリはこの形式で追加
  // {
  //   category: "カテゴリ名",
  //   pzl: 3,
  //   view: "plan",
  //   stage: "oll",
  //   algs: [{ name: "名前", alg: "R U R'" }],
  // },
];
