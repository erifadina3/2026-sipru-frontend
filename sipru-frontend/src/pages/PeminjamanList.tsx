import { useEffect, useState } from "react"
import { getPeminjaman } from "../services/peminjamanService"
import type { Peminjaman } from "../types/Peminjaman"
import PeminjamanTable from "../components/PeminjamanTable"

export default function PeminjamanList() {
  const [data, setData] = useState<Peminjaman[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPeminjaman()
      .then(res => setData(res))
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading data...</p>

  if (error) return <p style={{ color: "red" }}>{error}</p>

  return <PeminjamanTable data={data} />
}
