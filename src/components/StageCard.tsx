import type { PuzzleGroup, Stage } from "../types";
import { PuzzleView } from "./PuzzleView";

// 段階へのリンクカード。代表として先頭 alg の図をサムネイル表示する。
export function StageCard({ group, stage }: { group: PuzzleGroup; stage: Stage }) {
  const first = stage.algs[0];
  return (
    <a className="stage-card" href={`#/${group.id}/${stage.id}`}>
      {first ? (
        <PuzzleView
          type={stage.type}
          alg={first.alg}
          mask={stage.mask}
          puzzleSize={stage.puzzleSize}
          px={120}
        />
      ) : (
        <div className="puzzle-view" style={{ width: 120, height: 120 }} />
      )}
      <div className="stage-name">{stage.name}</div>
      <div className="stage-count">{stage.algs.length} 手順</div>
    </a>
  );
}
