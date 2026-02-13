import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPeminjaman } from "../services/peminjamanService"
import type { Peminjaman } from "../types/Peminjaman"
import PeminjamanTable from "../components/PeminjamanTable"

export default function PeminjamanList() {
  const [data, setData] = useState<Peminjaman[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPeminjaman()
        setData(res)
      } catch (err) {
        console.error("FETCH ERROR:", err)
        setError("Gagal mengambil data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading data...
      </div>
    )

  if (error)
    return (
      <div className="p-6 text-red-600 font-medium">
        {error}
      </div>
    )

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Peminjaman</h1>
           <Link
            to="/tambah"
            className="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah
          </Link>
      <div className="mt-4">
        <PeminjamanTable data={data} />
      </div>
    </div>
  )
}
