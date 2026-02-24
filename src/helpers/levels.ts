export type LevelKey = "Sin nivel" | "explorer" | "adventurer" | "hero";

export const LEVEL_ORDER: LevelKey[] = ["Sin nivel", "explorer", "adventurer", "hero"];

export const LEVEL_RANK: Record<LevelKey, number> = {
  "Sin nivel": 0,
  explorer: 1,
  adventurer: 2,
  hero: 3,
};

export const translateLevel = (level: string) => {
  switch (level) {
    case "Sin nivel":
      return "Sin nivel";
    case "explorer":
      return "Explorador";
    case "adventurer":
      return "Aventurero";
    case "hero":
      return "Héroe";
    default:
      return "Sin nivel";
  }
};

/**
 * La API entrega `nextLevelName` (siguiente nivel), no el actual.
 * Orden: Sin nivel -> explorer -> adventurer -> hero
 * - next = "explorer"  => actual = "Sin nivel"
 * - next = "adventurer"=> actual = "explorer"
 * - next = "hero"      => actual = "adventurer"
 * - next = null        => actual = "hero"
 */
export function getCurrentLevelFromNextLevelName(
  nextLevelName: string | null | undefined
): LevelKey {
  if (nextLevelName == null) return "hero";

  const idx = LEVEL_ORDER.indexOf(nextLevelName as LevelKey);
  if (idx <= 0) return "Sin nivel";

  return LEVEL_ORDER[idx - 1] || "Sin nivel";
}

export function getHighestLevel(levels: Array<LevelKey | null | undefined>): LevelKey {
  let best: LevelKey = "Sin nivel";
  for (const l of levels) {
    if (!l) continue;
    const candidate = LEVEL_RANK[l] ?? 0;
    if (candidate > LEVEL_RANK[best]) best = l;
  }
  return best;
}

