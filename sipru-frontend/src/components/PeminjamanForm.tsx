import { useState } from "react"
import type { Peminjaman } from "../types/Peminjaman"

interface Props {
  onSubmit: (data: Omit<Peminjaman,"id">) => Promise<void>
}

export default function PeminjamanForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    namaPeminjam: "",
    namaRuangan: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    keperluan: "",
    status: 0
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <input name="namaPeminjam" placeholder="Nama" onChange={handleChange} className="input" />
      <input name="namaRuangan" placeholder="Ruangan" onChange={handleChange} className="input" />
      <input type="datetime-local" name="tanggalMulai" onChange={handleChange} className="input" />
      <input type="datetime-local" name="tanggalSelesai" onChange={handleChange} className="input" />
      <textarea name="keperluan" placeholder="Keperluan" onChange={handleChange} className="input" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  )
}
