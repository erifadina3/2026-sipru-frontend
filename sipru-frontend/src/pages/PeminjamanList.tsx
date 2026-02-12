import { useEffect, useState } from "react"
import { getPeminjaman } from "../services/peminjamanService"
import type { Peminjaman } from "../types/Peminjaman"
import PeminjamanTable from "../components/PeminjamanTable"

export default function PeminjamanList() {
  const [data, setData] = useState<Peminjaman[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPeminjaman()
      .then(res => setData(res))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading data...</p>

  return (
    <div>
      <h2>Daftar Peminjaman Ruangan</h2>
      <PeminjamanTable data={data} />
    </div>
  )
}
