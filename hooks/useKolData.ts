import { useEffect } from "react"
import { useKolStore } from "@/store/useKolStore"

const KOLS_URL =
  "https://gist.githubusercontent.com/Sandeepsorout01/4fef48fa4ddaa7551ad9fdeb5a0087e1/raw/kols.json"
const SIGNALS_URL =
  "https://gist.githubusercontent.com/Sandeepsorout01/4fef48fa4ddaa7551ad9fdeb5a0087e1/raw/signals.json"

export function useKolData() {
  const { setKols, setSignals, setLoading, setError, setLastUpdated } =
    useKolStore()

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const [kolsRes, signalsRes] = await Promise.all([
        fetch(KOLS_URL),
        fetch(SIGNALS_URL),
      ])

      if (!kolsRes.ok || !signalsRes.ok) throw new Error("Failed to fetch")

      const [kols, signals] = await Promise.all([
        kolsRes.json(),
        signalsRes.json(),
      ])

      setKols(kols)
      setSignals(signals)
      setLastUpdated(new Date().toISOString())
    } catch {
      setError("Failed to load data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { refetch: fetchData }
}