import { PRODUCTS, type Product } from "../products";

interface ProductPanelProps {
  selectedId: string;
  onSelect: (id: Product["id"]) => void;
}

export function ProductPanel({ selectedId, onSelect }: ProductPanelProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">পণ্য বেছে নিন</p>
      <div className="grid grid-cols-2 gap-2">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className={[
              "min-h-11 px-3 py-2 text-sm font-medium border transition-colors text-left",
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
