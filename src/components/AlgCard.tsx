import { PuzzleView } from "./PuzzleView";
import type { Stage, AlgItem } from "../types";

export function AlgCard({ item, stage }: { item: AlgItem; stage: Stage }) {
  return (
    <div className="alg-card">
      <PuzzleView
        type={stage.type}
        alg={item.alg}
        mask={item.mask ?? stage.mask}
        scheme={stage.scheme}
        puzzleSize={stage.puzzleSize}
      />
      <div className="alg-name">{item.name}</div>
      <code className="alg-moves">{item.alg}</code>
    </div>
  );
}
