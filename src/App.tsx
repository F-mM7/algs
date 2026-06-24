import { useEffect, useState } from "react";
import { puzzleGroups } from "./data";
import { Home } from "./components/Home";
import { StageDetail } from "./components/StageDetail";

// "#/3x3/pll" → ["3x3", "pll"]。ハッシュルーティング（静的ホスティングでも動く）。
function useHashParts(): string[] {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash.replace(/^#\/?/, "").split("/").filter(Boolean);
}

export default function App() {
  const [groupId, stageId] = useHashParts();
  const group = puzzleGroups.find((g) => g.id === groupId);
  const stage = group?.stages.find((s) => s.id === stageId);

  // ビュー切り替え時はトップへスクロール。
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [groupId, stageId]);

  return (
    <main id="app">
      {group && stage ? (
        <StageDetail group={group} stage={stage} />
      ) : (
        <Home groups={puzzleGroups} />
      )}
    </main>
  );
}
