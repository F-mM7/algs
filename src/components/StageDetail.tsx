import type { PuzzleGroup, Stage } from "../types";
import { AlgCard } from "./AlgCard";

// 段階のリンク先。その段階の alg を一覧表示する。
export function StageDetail({ group, stage }: { group: PuzzleGroup; stage: Stage }) {
  return (
    <>
      <p className="breadcrumb">
        <a href="#/">← 一覧</a>
        <span className="sep">/</span>
        <span>{group.name}</span>
      </p>
      <h2 className="stage-title">
        {group.name} — {stage.name}
      </h2>
      <div className="alg-grid">
        {stage.algs.map((item, i) => (
          <AlgCard key={i} item={item} stage={stage} />
        ))}
      </div>
    </>
  );
}
