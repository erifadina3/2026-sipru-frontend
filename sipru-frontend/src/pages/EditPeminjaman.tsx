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
      .then(data => setForm(data))
      .finally(() => setLoading(false))
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value })
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

  if (loading) return <p>Loading...</p>
  if (!form) return <p>Data tidak ditemukan</p>

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Edit Peminjaman</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="namaPeminjam"
          value={form.namaPeminjam}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="namaRuangan"
          value={form.namaRuangan}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="tanggalMulai"
          value={form.tanggalMulai}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="tanggalSelesai"
          value={form.tanggalSelesai}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="keperluan"
          value={form.keperluan}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  )
}
