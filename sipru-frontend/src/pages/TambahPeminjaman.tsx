import { useNavigate } from "react-router-dom"
import type { Peminjaman } from "../types/Peminjaman"
import PeminjamanForm from "../components/PeminjamanForm"
import { createPeminjaman } from "../services/peminjamanService"

export default function TambahPeminjaman() {
  const navigate = useNavigate()

  async function handleSubmit(data:Omit<Peminjaman, "id">) {
    await createPeminjaman(data)
    navigate("/")
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Tambah Peminjaman
      </h1>

      <PeminjamanForm onSubmit={handleSubmit}/>
    </div>
  )
}
