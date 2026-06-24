import { useEffect, useRef } from "react";
import { SVG } from "sr-puzzlegen";
import type { PuzzleOptions } from "sr-puzzlegen";
import type { Stage, StickerMask } from "../types";

interface Props {
  type: Stage["type"];
  alg: string;
  mask?: StickerMask;
  puzzleSize?: number;
  px?: number;
}

// puzzle-gen は DOM 要素に SVG を描画する命令的 API なので、ref + effect で橋渡しする。
export function PuzzleView({ type, alg, mask, puzzleSize, px = 150 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.replaceChildren();
    el.classList.remove("err");
    try {
      const puzzle: PuzzleOptions & { size?: number } = { case: alg };
      if (mask) puzzle.mask = mask;
      if (puzzleSize) puzzle.size = puzzleSize;
      SVG(el, type, { width: px, height: px, puzzle });
    } catch (e) {
      el.classList.add("err");
      el.textContent = String(e);
    }
    return () => el.replaceChildren();
  }, [type, alg, mask, puzzleSize, px]);

  return <div className="puzzle-view" ref={ref} style={{ width: px, height: px }} />;
}
