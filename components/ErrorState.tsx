import { AlertTriangle } from "lucide-react"

type Props = {
  onRetry: () => void
}

export function ErrorState({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <AlertTriangle size={40} className="text-red-400/60" />
      <p className="text-white/40 text-sm">
        Something went wrong loading data
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-sm text-red-400 hover:text-red-300 transition-all"
      >
        Retry
      </button>
    </div>
  )
}