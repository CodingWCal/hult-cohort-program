const LOOK: Record<string, { bg: string; mark: string; label: string }> = {
  doubles: { bg: "#e2b84a", mark: "#6b2e12", label: "bara" },
  bake: { bg: "#3d7ea6", mark: "#f4e4c4", label: "bake" },
  roti: { bg: "#d97706", mark: "#fde68a", label: "roti" },
  pelau: { bg: "#92400e", mark: "#fbbf24", label: "pelau" },
  crab: { bg: "#0f766e", mark: "#99f6e4", label: "crab" },
  aloo: { bg: "#ca8a04", mark: "#fef3c7", label: "aloo" },
  duck: { bg: "#9a3412", mark: "#fed7aa", label: "duck" },
  oil: { bg: "#365314", mark: "#d9f99d", label: "pot" },
  sunday: { bg: "#7f1d1d", mark: "#fecaca", label: "lunch" },
  soup: { bg: "#1e1b4b", mark: "#facc15", label: "soup" },
  choka: { bg: "#b91c1c", mark: "#fecaca", label: "choka" },
  bread: { bg: "#a16207", mark: "#fde68a", label: "bake" },
  kraft: { bg: "#c9a66b", mark: "#6b2e12", label: "pot" },
};

export function DishVisual({ visual, soldOut }: { visual: string; soldOut?: boolean }) {
  const look = LOOK[visual] || LOOK.kraft;
  return (
    <div
      className="relative h-28 overflow-hidden rounded-t-[1.15rem]"
      style={{ background: look.bg }}
      aria-hidden
    >
      <div className="absolute inset-x-0 top-0 h-3 foil-bar opacity-80" />
      <div
        className="absolute left-6 top-8 h-16 w-16 rounded-full opacity-90"
        style={{ background: look.mark }}
      />
      <div
        className="absolute left-16 top-12 h-10 w-20 rounded-full opacity-70"
        style={{ background: look.mark }}
      />
      <p className="absolute bottom-2 right-3 text-xs uppercase tracking-[0.18em] text-white/90">
        {look.label}
      </p>
      {soldOut ? (
        <span className="stamp absolute right-4 top-8 bg-[var(--card)]">Pot done</span>
      ) : null}
    </div>
  );
}
