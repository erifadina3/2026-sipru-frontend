import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { Peminjaman } from "../types/Peminjaman"

const BASE_URL = "http://localhost:5153/api/peminjaman"

export default function EditPeminjaman() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState<Peminjaman | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          ...data,
          status: Number(data.status)
        })
      })
      .finally(() => setLoading(false))
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (!form) return
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "status"
          ? Number(e.target.value)
          : e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    navigate("/")
  }

  if (loading)
    return (
      <div className="max-w-3xl bg-white/80 p-8 rounded-xl shadow-md border border-slate-200">
        <p>Loading...</p>
      </div>
    )

  if (!form)
    return (
      <div className="max-w-3xl bg-white/80 p-8 rounded-xl shadow-md border border-slate-200">
        <p>Data tidak ditemukan</p>
      </div>
    )

  return (
    <div className="max-w-3xl bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-slate-200">
      
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Edit Peminjaman
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Peminjam
          </label>
          <input
            name="namaPeminjam"
            value={form.namaPeminjam}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Ruangan
          </label>
          <input
            name="namaRuangan"
            value={form.namaRuangan}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Mulai
          </label>
          <input
            type="datetime-local"
            name="tanggalMulai"
            value={form.tanggalMulai}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Selesai
          </label>
          <input
            type="datetime-local"
            name="tanggalSelesai"
            value={form.tanggalSelesai}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Keperluan
          </label>
          <textarea
            name="keperluan"
            value={form.keperluan}
            onChange={handleChange}
            rows={3}
            className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value={0}>Menunggu</option>
            <option value={1}>Disetujui</option>
            <option value={2}>Ditolak</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-md transition"
          >
            Batal
          </button>
        </div>

      </form>
    </div>
  )
}
