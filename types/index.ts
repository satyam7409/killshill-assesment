export type Signal = {
  id: string
  kol_id: string
  symbol: string
  direction: "BUY" | "SELL"
  entry_price: number
  target_price: number
  stop_loss: number
  current_price: number
  status: "OPEN" | "TARGET_HIT" | "STOPLOSS_HIT" | "EXPIRED"
  roi_pct: number
  entry_time: string
  expiry_time: string
  created_at: string
}

export type KOL = {
  id: string
  handle: string
  name: string
  avatar: string
  bio: string
  verified: boolean
  total_signals: number
  accuracy_pct: number
  avg_roi_pct: number
  joined_at: string
  last_signal_at: string
}