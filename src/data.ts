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

import { Type, Masks, Colors } from "sr-puzzlegen";
import type { PuzzleGroup } from "./types";

// megaminx 配色: 白を底面に置いて最終層（上面）を解く向き。
// puzzle-gen 既定（白=上）を左右水平軸まわりに 180° 反転させた白底配色
// （最終層 U=白の対面のグレー、周囲も底面まわりの色に揃う。U↔d/F↔b/L↔bl/R↔br/dl↔BL/dr↔BR）。
// MEGAMINX_TOP の描画に効くのは U/F/R/L/BR/BL の6面だが、
// scheme はシャローマージのため全12面を指定する。
const megaminxScheme = {
  U: Colors.GREY, // 最終層（上面）= 白の対面
  F: Colors.ORANGE,
  R: Colors.LIGHT_GREEN,
  dr: Colors.YELLOW,
  dl: Colors.PURPLE,
  L: Colors.DARK_BLUE,
  d: Colors.WHITE, // 底面 = 白
  br: Colors.BLUE,
  BR: Colors.PINK,
  BL: Colors.LIGHT_YELLOW,
  bl: Colors.GREEN,
  b: Colors.RED,
};

// 最終層マスク: 伏せたステッカーは puzzle-gen の「マスク色」#404040 になり、
// 「最終層色」#808080（= Colors.GREY, U 面）とは別トーンで区別される。
// 方針: 各段階を解く直前の状態を表示し、「まだ未着手の後段階要素」だけを伏せる。
//   U 面 index: 0=中心 / 1,3,5,7,9=エッジ / 2,4,6,8,10=コーナー。
//   側面(F/R/L/BR/BL)の可視 index — エッジ: F3 R1 L5 BR7 BL9 / コーナー: F2,4 R2,10 L4,6 BR6,8 BL8,10。
// EOLL: エッジ向きを見る。U 面コーナー(CO)＋側面(EP,CP)を伏せ、U 面エッジのみ表示。
const maskEOLL = { ...Masks.MEGA_3.OLL, U: [2, 4, 6, 8, 10] };
// COLL: コーナー向きを見る。側面(EP,CP)を全て伏せ U 面は全表示 → ステージで Masks.MEGA_3.OLL を使用。
// EPLL: エッジ位置を見る。側面コーナー(CP)のみ伏せ、U 面＋側面エッジを表示（位置は側面エッジで判別）。
const maskEPLL = { F: [2, 4], R: [2, 10], L: [4, 6], BR: [6, 8], BL: [8, 10] };
// CPLL: コーナー位置を見る。未着手の後段階要素がないためマスクなし（全表示）。

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
      // megaminx は素の D 単独は不可。R / U 系（R++ / D-- 等の Pochmann 記法も可）。
      // solve 順: EOLL → COLL → EPLL → CPLL。各段階は認識に不要なステッカーを
      // 「マスク色」#404040 に伏せる（U 面の「最終層色」#808080 と区別される）。
      {
        id: "eoll",
        name: "EOLL",
        type: Type.MEGAMINX_TOP,
        scheme: megaminxScheme,
        mask: maskEOLL,
        algs: [
          { name: "F sexy F'", alg: "F R U R' U' F'" },
          // ↓ ここに自分の EOLL を追加
        ],
      },
      {
        id: "coll",
        name: "COLL",
        type: Type.MEGAMINX_TOP,
        scheme: megaminxScheme,
        mask: Masks.MEGA_3.OLL,
        algs: [
          { name: "Sune", alg: "R U R' U R U2' R'" },
          { name: "Anti-sune", alg: "R U2 R' U' R U' R'" },
          { name: "Mirror Sune", alg: "R' U' R U' R' U2 R" },
          { name: "Mirror Anti-sune", alg: "R' U2' R U R' U R" },
          { name: "Double Sune", alg: "R U R' U R U' R' U R U2' R'" },
          { name: "Anti Double Sune", alg: "R U2 R' U' R U R' U' R U' R'" },
          { name: "Triple Sune", alg: "R U R' U R U' R' U R U' R' U R U2' R'" },
          // ↓ ここに自分の COLL を追加
        ],
      },
      {
        id: "epll",
        name: "EPLL",
        type: Type.MEGAMINX_TOP,
        scheme: megaminxScheme,
        mask: maskEPLL,
        algs: [
          { name: "J perm", alg: "R U R' F' R U R' U' R' F R2 U' R' U'" },
          // ↓ ここに自分の EPLL を追加
        ],
      },
      {
        id: "cpll",
        name: "CPLL",
        type: Type.MEGAMINX_TOP,
        scheme: megaminxScheme,
        // コーナー位置の段階。未着手の後段階がないためマスクなし（全表示）。手順は登録しない。
        algs: [],
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
