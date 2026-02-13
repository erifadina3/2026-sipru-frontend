import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPeminjamanById } from "../services/peminjamanService"
import type { Peminjaman } from "../types/Peminjaman"

export default function PeminjamanDetail() {
  const { id } = useParams()
  const [data, setData] = useState<Peminjaman | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    getPeminjamanById(Number(id))
      .then(setData)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading detail...</p>
  if (!data) return <p>Data tidak ditemukan</p>

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Detail Peminjaman</h2>
      <p><b>Nama:</b> {data.namaPeminjam}</p>
      <p><b>Ruangan:</b> {data.namaRuangan}</p>
      <p><b>Keperluan:</b> {data.keperluan}</p>
      <p><b>Status:</b> {data.status}</p>
    </div>
  )
}
