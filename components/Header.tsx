import { RefreshCw } from "lucide-react"
import { useKolStore } from "@/store/useKolStore"

type HeaderProps = {
  onRefresh: () => void
}

export function Header({ onRefresh }: HeaderProps) {
  const { kols, lastUpdated, loading } = useKolStore()

  const formatted = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "—"

  return (
    <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white tracking-tight">
          KOL Audit Board
        </h1>
        <p className="text-sm text-white/40">
          Tracking{" "}
          <span className="text-emerald-400 font-semibold">{kols.length}</span>{" "}
          influencers · Last updated{" "}
          <span className="text-white/60">{formatted}</span>
        </p>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/70 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <RefreshCw
          size={14}
          className={loading ? "animate-spin" : ""}
        />
        Refresh
      </button>
    </div>
  )
}