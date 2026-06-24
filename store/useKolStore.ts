import { create } from "zustand"
import { KOL, Signal } from "@/types"

type KolStore = {
  kols: KOL[]
  signals: Signal[]
  loading: boolean
  error: string | null
  lastUpdated: string | null
  search: string
  minAccuracy: number
  sortBy: "accuracy_pct" | "total_signals" | "avg_roi_pct"
  sortOrder: "asc" | "desc"
  selectedKol: KOL | null

  setKols: (kols: KOL[]) => void
  setSignals: (signals: Signal[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLastUpdated: (ts: string) => void
  setSearch: (search: string) => void
  setMinAccuracy: (min: number) => void
  setSortBy: (col: "accuracy_pct" | "total_signals" | "avg_roi_pct") => void
  setSortOrder: (order: "asc" | "desc") => void
  setSelectedKol: (kol: KOL | null) => void
  clearFilters: () => void
}

export const useKolStore = create<KolStore>((set) => ({
  kols: [],
  signals: [],
  loading: false,
  error: null,
  lastUpdated: null,
  search: "",
  minAccuracy: 0,
  sortBy: "accuracy_pct",
  sortOrder: "desc",
  selectedKol: null,

  setKols: (kols) => set({ kols }),
  setSignals: (signals) => set({ signals }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setLastUpdated: (lastUpdated) => set({ lastUpdated }),
  setSearch: (search) => set({ search }),
  setMinAccuracy: (minAccuracy) => set({ minAccuracy }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedKol: (selectedKol) => set({ selectedKol }),
  clearFilters: () => set({ search: "", minAccuracy: 0 }),
}))