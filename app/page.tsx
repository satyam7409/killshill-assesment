"use client"

import { Header } from "@/components/Header"
import { KolTable } from "@/components/KolTable"
import { SignalDrawer } from "@/components/SignalDrawer"
import { toast } from "sonner"
import { useKolData } from "@/hooks/useKolData"


export default function Home() {
  const { refetch } = useKolData()

  async function handleRefresh() {
    await refetch()
    toast.success("Data refreshed")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header onRefresh={handleRefresh} />
      <KolTable onRetry={refetch} />
      <SignalDrawer />
    </main>
  )
}