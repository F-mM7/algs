import type { PuzzleGroup } from "../types";
import { StageCard } from "./StageCard";

// キューブ種別ごとにセクションを分け、段階のリンクカードを並べる。
export function Home({ groups }: { groups: PuzzleGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <section className="group" key={group.id}>
          <h2>{group.name}</h2>
          <div className="stage-grid">
            {group.stages.map((stage) => (
              <StageCard key={stage.id} group={group} stage={stage} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
