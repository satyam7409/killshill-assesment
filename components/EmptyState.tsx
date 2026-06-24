import { SearchX } from "lucide-react"
import { useKolStore } from "@/store/useKolStore"

export function EmptyState() {
  const { clearFilters } = useKolStore()

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <SearchX size={40} className="text-white/20" />
      <p className="text-white/40 text-sm">No KOLs match your filters</p>
      <button
        onClick={clearFilters}
        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/60 hover:text-white transition-all"
      >
        Clear Filters
      </button>
    </div>
  )
}