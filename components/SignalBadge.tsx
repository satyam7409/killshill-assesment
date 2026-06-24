type Props = {
  direction: "BUY" | "SELL"
}

export function SignalBadge({ direction }: Props) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-bold tracking-wide ${
        direction === "BUY"
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {direction}
    </span>
  )
}