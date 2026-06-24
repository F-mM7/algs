// ============================================================================
// alg データ。ここを編集して自分の覚えている手順を追加・削除します。
//
// 図は puzzle-gen (sr-puzzlegen) がクライアント側で SVG として描画します。
// 構造（2階層）:
//   puzzleGroups = キューブ種別の配列（トップのセクション）
//   各種別 = { id, name, stages: [ 段階 ] }
//   各段階 = { id, name, type, mask?, puzzleSize?, algs: [ { name, alg, mask? } ] }
//
// 各 alg は「解く前の状態（認識図）」として表示されます（puzzle-gen の case=）。
//
// type（描画する puzzle と視点）:
//   Type.CUBE_TOP     : 3x3 上面図（OLL/PLL 認識図向き）
//   Type.CUBE         : 3x3 立体図（F2L 等）。puzzleSize で 4x4 等にも
//   Type.MEGAMINX_TOP : megaminx 上面図（最終層 認識図向き）
//   Type.MEGAMINX     : megaminx 立体図 / Type.MEGAMINX_NET : 展開図
//
// mask（VisualCube の stage 相当・該当ステッカーをグレー化）:
//   Masks.CUBE_3.OLL / F2L / LAST_LAYER / FIRST_LAYER /
//   CORNERS_LAST_LAYER / EDGES_LAST_LAYER / Masks.MEGA_3.OLL
//   任意指定も可: { U: [0, 2, 6, 8] }
// ============================================================================

import { Type, Masks } from "sr-puzzlegen";
import type { PuzzleGroup } from "./types";

export const puzzleGroups: PuzzleGroup[] = [
  {
    id: "3x3",
    name: "3x3",
    stages: [
      {
        id: "pll",
        name: "PLL",
        type: Type.CUBE_TOP,
        algs: [
          { name: "T perm", alg: "R U R' U' R' F R2 U' R' U' R U R' F'" },
          { name: "Y perm", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
          // ↓ ここに自分の PLL を追加
        ],
      },
      {
        id: "oll",
        name: "OLL",
        type: Type.CUBE_TOP,
        mask: Masks.CUBE_3.OLL,
        algs: [
          { name: "Sune (OLL 27)", alg: "R U R' U R U2 R'" },
          { name: "Antisune (OLL 26)", alg: "R U2 R' U' R U' R'" },
          // ↓ ここに自分の OLL を追加
        ],
      },
      {
        id: "f2l",
        name: "F2L",
        type: Type.CUBE,
        mask: Masks.CUBE_3.F2L,
        algs: [
          { name: "右手 基本", alg: "U R U' R'" },
          { name: "左手 基本", alg: "U' L' U L" },
          // ↓ ここに自分の F2L を追加
        ],
      },
    ],
  },
  {
    id: "4x4",
    name: "4x4",
    stages: [
      {
        id: "parity",
        name: "パリティ",
        type: Type.CUBE,
        puzzleSize: 4,
        algs: [
          {
            name: "OLL parity",
            alg: "Rw U2 x Rw U2 Rw U2' Rw' U2 Lw U2 Rw' U2' Rw U2 Rw' U2' Rw'",
          },
          // ↓ ここに自分の 4x4 手順を追加
        ],
      },
    ],
  },
  {
    id: "megaminx",
    name: "Megaminx",
    stages: [
      {
        id: "ll",
        name: "最終層",
        type: Type.MEGAMINX_TOP,
        algs: [
          // megaminx は素の D 単独は不可。R / U 系（R++ / D-- 等の Pochmann 記法も可）
          { name: "例: 最終層", alg: "R' U2' R2 U R2' U R2 U2' R'" },
          { name: "例: sexy", alg: "R U R' U'" },
          // ↓ ここに自分の megaminx 手順を追加
        ],
      },
    ],
  },
  // ↓ 新しいキューブ種別はこの形式で追加
  // {
  //   id: "pyraminx",
  //   name: "Pyraminx",
  //   stages: [{ id: "...", name: "...", type: Type.PYRAMINX, algs: [...] }],
  // },
];
