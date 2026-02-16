import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPeminjamanById } from "../services/peminjamanService"
import type { Peminjaman } from "../types/Peminjaman"

export default function PeminjamanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState<Peminjaman | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    getPeminjamanById(Number(id))
      .then(setData)
      .finally(() => setLoading(false))
  }, [id])

  const getStatusLabel = (status: number) => {
  switch (Number(status)) {
    case 0:
      return { text: "Menunggu", style: "bg-yellow-100 text-yellow-700" }
    case 1:
      return { text: "Disetujui", style: "bg-green-100 text-green-700" }
    case 2:
      return { text: "Ditolak", style: "bg-red-100 text-red-600" }
    default:
      return { text: "Tidak diketahui", style: "bg-slate-100 text-slate-600" }
  }
}

  if (loading) {
    return (
      <div className="max-w-3xl bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-slate-200">
        <p className="text-slate-500">Loading detail...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-3xl bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-slate-200">
        <p className="text-red-500">Data tidak ditemukan</p>
      </div>
    )
  }

  const status = getStatusLabel(Number(data.status))

  return (
    <div className="max-w-3xl bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-slate-200 space-y-6">
      
      <h2 className="text-xl font-bold text-slate-800">
        Detail Peminjaman
      </h2>

      <div className="space-y-4 text-slate-700">
        <div>
          <span className="font-semibold">Nama:</span>
          <p className="mt-1">{data.namaPeminjam}</p>
        </div>

        <div>
          <span className="font-semibold">Ruangan:</span>
          <p className="mt-1">{data.namaRuangan}</p>
        </div>

        <div>
          <span className="font-semibold">Keperluan:</span>
          <p className="mt-1">{data.keperluan}</p>
        </div>

        <div>
          <span className="font-semibold">Status:</span>
          <span className={`ml-2 px-3 py-1 text-sm rounded-full ${status.style}`}>
            {status.text}
          </span>
        </div>
      </div>

      <div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition"
        >
          ← Kembali
        </button>
      </div>

    </div>
  )
}
