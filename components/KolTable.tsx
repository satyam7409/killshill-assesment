"use client"

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"
import { useKolStore } from "@/store/useKolStore"
import { columns } from "./KolTableColumns"
import { TableSkeleton } from "./TableSkeleton"
import { EmptyState } from "./EmptyState"
import { ErrorState } from "./ErrorState"
import { Search } from "lucide-react"

type Props = {
  onRetry: () => void
}

export function KolTable({ onRetry }: Props) {
  const {
    kols,
    loading,
    error,
    search,
    setSearch,
    minAccuracy,
    setMinAccuracy,
    setSelectedKol,
  } = useKolStore()

  const [sorting, setSorting] = useState<SortingState>([
    { id: "accuracy_pct", desc: true },
  ])

  const filtered = useMemo(() => {
    return kols.filter((k) => {
      const matchSearch = k.handle
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        k.name.toLowerCase().includes(search.toLowerCase())
      const matchAccuracy = k.accuracy_pct >= minAccuracy
      return matchSearch && matchAccuracy
    })
  }, [kols, search, minAccuracy])

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (error) return <ErrorState onRetry={onRetry} />

  return (
    <div className="flex flex-col gap-4 p-4">

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by handle or name..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs whitespace-nowrap">
            Min Accuracy
          </span>
          <input
            type="number"
            min={0}
            max={100}
            value={minAccuracy}
            onChange={(e) => setMinAccuracy(Number(e.target.value))}
            className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
          <span className="text-white/40 text-xs">%</span>
        </div>
      </div>

      {/* Table — desktop */}
      {loading ? (
        <TableSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-white/10">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedKol(row.original)}
                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {table.getRowModel().rows.map((row, i) => {
              const kol = row.original
              return (
                <div
                  key={kol.id}
                  onClick={() => setSelectedKol(kol)}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 cursor-pointer hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-white/20 text-xs font-mono w-4">
                        {i + 1}
                      </span>
                      <img
                        src={kol.avatar}
                        alt={kol.handle}
                        className="w-9 h-9 rounded-full bg-white/10"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">
                          {kol.handle}
                        </p>
                        <p className="text-white/40 text-xs">{kol.name}</p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        kol.accuracy_pct >= 60
                          ? "text-emerald-400"
                          : kol.accuracy_pct >= 40
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {kol.accuracy_pct}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    <div>
                      <p className="text-white/30 text-xs">Signals</p>
                      <p className="text-white/70 text-sm">
                        {kol.total_signals}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs">Avg ROI</p>
                      <p
                        className={`text-sm font-semibold ${
                          kol.avg_roi_pct >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {kol.avg_roi_pct >= 0 ? "+" : ""}
                        {kol.avg_roi_pct}%
                      </p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs">Last Signal</p>
                      <p className="text-white/50 text-xs">
                        {new Date(kol.last_signal_at).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short" }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}