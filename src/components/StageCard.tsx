import type { PuzzleGroup, Stage } from "../types";
import { PuzzleView } from "./PuzzleView";

// 段階へのリンクカード。代表として先頭 alg の図をサムネイル表示する。
export function StageCard({ group, stage }: { group: PuzzleGroup; stage: Stage }) {
  const first = stage.algs[0];
  return (
    <a className="stage-card" href={`#/${group.id}/${stage.id}`}>
      {/* 代表は先頭 alg の図。未登録ならソルブ状態（alg=""）を表示。 */}
      <PuzzleView
        type={stage.type}
        alg={first ? first.alg : ""}
        mask={stage.mask}
        scheme={stage.scheme}
        puzzleSize={stage.puzzleSize}
        px={120}
      />
      <div className="stage-name">{stage.name}</div>
      <div className="stage-count">{stage.algs.length} 手順</div>
    </a>
  );
}
