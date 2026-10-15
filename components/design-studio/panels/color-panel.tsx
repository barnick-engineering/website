import { PALETTES } from "../palettes";

interface ColorPanelProps {
  selectedId: string;
  onPaletteChange: (id: string) => void;
}

export function ColorPanel({ selectedId, onPaletteChange }: ColorPanelProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">রঙের থিম বেছে নিন</p>
      <div className="grid grid-cols-4 gap-2">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPaletteChange(p.id)}
            title={p.labelBn}
            aria-label={p.labelBn}
            aria-pressed={selectedId === p.id}
            className={[
              "h-11 w-full flex overflow-hidden border transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selectedId === p.id ? "ring-2 ring-foreground ring-offset-2" : "border-border hover:ring-1 hover:ring-border",
            ].join(" ")}
          >
            <span className="flex-1 h-full" style={{ background: p.bg }} />
            <span className="flex-1 h-full" style={{ background: p.primary }} />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPaletteChange(p.id)}
            className={[
              "min-h-11 px-3 py-2 text-xs border transition-colors text-left",
              selectedId === p.id
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:bg-muted",
            ].join(" ")}
          >
            {p.labelBn}
          </button>
        ))}
      </div>
    </div>
  );
}
