type Props = {
  status: "OPEN" | "TARGET_HIT" | "STOPLOSS_HIT" | "EXPIRED"
}

const config = {
  OPEN: "bg-yellow-500/20 text-yellow-400",
  TARGET_HIT: "bg-emerald-500/20 text-emerald-400",
  STOPLOSS_HIT: "bg-red-500/20 text-red-400",
  EXPIRED: "bg-white/10 text-white/40",
}

const label = {
  OPEN: "Open",
  TARGET_HIT: "Target Hit",
  STOPLOSS_HIT: "Stop Loss",
  EXPIRED: "Expired",
}

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold ${config[status]}`}
    >
      {label[status]}
    </span>
  )
}