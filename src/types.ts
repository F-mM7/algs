import type { Type } from "sr-puzzlegen";

// 面ごとに「グレー化するステッカー番号」を並べたマスク。
// 番号は各面 0〜8（cube）/ 0〜10（megaminx）の行優先。
// 例: { U: [0, 2, 6, 8] } → U 面の四隅をグレーに。
export type StickerMask = { [face: string]: number[] };

export interface AlgItem {
  name: string;
  alg: string;
  // この alg だけマスクを差し替えたいとき（省略時は段階の mask を使用）。
  mask?: StickerMask;
}

// 段階（PLL / OLL / F2L / パリティ など）。リンクカード1枚＝1段階。
export interface Stage {
  id: string; // ルーティング用スラッグ（例: "pll"）
  name: string; // 表示名（例: "PLL"）
  // 描画する puzzle と視点。Type.CUBE_TOP（OLL/PLL）/ Type.CUBE（F2L 等）
  // / Type.MEGAMINX_TOP / Type.MEGAMINX / Type.MEGAMINX_NET など。
  type: Type;
  // 段階共通のマスク（VisualCube の stage 相当）。Masks.CUBE_3.OLL 等。
  mask?: StickerMask;
  // cube の N（4x4 なら 4）。省略時は 3。
  puzzleSize?: number;
  algs: AlgItem[];
}

// キューブ種別（3x3 / 4x4 / Megaminx など）。トップのセクション1つ＝1種別。
export interface PuzzleGroup {
  id: string; // ルーティング用スラッグ（例: "3x3"）
  name: string; // 表示名（例: "3x3"）
  stages: Stage[];
}
