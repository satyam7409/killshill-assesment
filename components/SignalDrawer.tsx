"use client"

import { useKolStore } from "@/store/useKolStore"
// import { SignalBadge } from "./SignalBadge"
import { SignalBadge } from "./SignalBadge"
// import { StatusBadge } from "./StatusBadge"
import { StatusBadge } from "./StatusBadge"
import { X } from "lucide-react"

export function SignalDrawer() {
  const { selectedKol, setSelectedKol, signals } = useKolStore()

  const kolSignals = signals
    .filter((s) => s.kol_id === selectedKol?.id)
    .slice(0, 10)

  if (!selectedKol) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => setSelectedKol(null)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0e0e11] border-l border-white/10 z-50 flex flex-col">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={selectedKol.avatar}
              alt={selectedKol.handle}
              className="w-9 h-9 rounded-full bg-white/10"
            />
            <div>
              <p className="text-white font-semibold text-sm">
                {selectedKol.handle}
              </p>
              <p className="text-white/40 text-xs">{selectedKol.name}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedKol(null)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/10">
          <div className="bg-[#0e0e11] px-4 py-3 flex flex-col gap-1">
            <p className="text-white/40 text-xs">Accuracy</p>
            <p className="text-emerald-400 font-bold text-sm">
              {selectedKol.accuracy_pct}%
            </p>
          </div>
          <div className="bg-[#0e0e11] px-4 py-3 flex flex-col gap-1">
            <p className="text-white/40 text-xs">Avg ROI</p>
            <p
              className={`font-bold text-sm ${
                selectedKol.avg_roi_pct >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {selectedKol.avg_roi_pct}%
            </p>
          </div>
          <div className="bg-[#0e0e11] px-4 py-3 flex flex-col gap-1">
            <p className="text-white/40 text-xs">Total Signals</p>
            <p className="text-white font-bold text-sm">
              {selectedKol.total_signals}
            </p>
          </div>
        </div>

        {/* Signals List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          <p className="text-white/40 text-xs uppercase tracking-widest px-1">
            Latest Signals
          </p>

          {kolSignals.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-12">
              No signals found
            </p>
          ) : (
            kolSignals.map((signal) => (
              <div
                key={signal.id}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">
                    {signal.symbol}
                  </span>
                  <div className="flex items-center gap-2">
                    <SignalBadge direction={signal.direction} />
                    <StatusBadge status={signal.status} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-white/30">Entry</p>
                    <p className="text-white/80">{signal.entry_price}</p>
                  </div>
                  <div>
                    <p className="text-white/30">Target</p>
                    <p className="text-emerald-400">{signal.target_price}</p>
                  </div>
                  <div>
                    <p className="text-white/30">Stop Loss</p>
                    <p className="text-red-400">{signal.stop_loss}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="text-white/30 text-xs">
                    {new Date(signal.entry_time).toLocaleDateString("en-IN")}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      signal.roi_pct >= 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {signal.roi_pct >= 0 ? "+" : ""}
                    {signal.roi_pct}% ROI
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}