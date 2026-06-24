import { ColumnDef } from "@tanstack/react-table"
import { KOL } from "@/types"
import { ArrowUpDown, BadgeCheck } from "lucide-react"

export const columns: ColumnDef<KOL>[] = [
  {
    id: "rank",
    header: "#",
    cell: ({ row }) => (
      <span className="text-white/30 text-sm font-mono">
        {row.index + 1}
      </span>
    ),
  },
  {
    accessorKey: "handle",
    header: "KOL",
    cell: ({ row }) => {
      const kol = row.original
      return (
        <div className="flex items-center gap-3">
          <img
            src={kol.avatar}
            alt={kol.handle}
            className="w-8 h-8 rounded-full bg-white/10"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-white text-sm font-medium">
                {kol.handle}
              </span>
              {kol.verified && (
                <BadgeCheck size={14} className="text-emerald-400" />
              )}
            </div>
            <span className="text-white/40 text-xs">{kol.name}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "accuracy_pct",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Accuracy
        <ArrowUpDown size={12} />
      </button>
    ),
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span
          className={`font-semibold text-sm ${
            val >= 60
              ? "text-emerald-400"
              : val >= 40
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {val}%
        </span>
      )
    },
  },
  {
    accessorKey: "total_signals",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Signals
        <ArrowUpDown size={12} />
      </button>
    ),
    cell: ({ getValue }) => (
      <span className="text-white/70 text-sm">{getValue() as number}</span>
    ),
  },
  {
    accessorKey: "avg_roi_pct",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Avg ROI
        <ArrowUpDown size={12} />
      </button>
    ),
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span
          className={`font-semibold text-sm ${
            val >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {val >= 0 ? "+" : ""}
          {val}%
        </span>
      )
    },
  },
  {
    accessorKey: "last_signal_at",
    header: "Last Signal",
    cell: ({ getValue }) => (
      <span className="text-white/40 text-xs">
        {new Date(getValue() as string).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "action",
    header: "",
    cell: () => (
      <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-xs text-white/50 hover:text-emerald-400 transition-all">
        View Signals
      </button>
    ),
  },
]