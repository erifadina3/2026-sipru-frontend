import { useState, useMemo } from "react"
import type { Peminjaman } from "../types/Peminjaman"
import StatusBadge from "./StatusBadge"
import { deletePeminjaman } from "../services/peminjamanService"
import { Link } from "react-router-dom"

interface Props {
  data: Peminjaman[]
}

export default function PeminjamanTable({ data }: Props) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)

  const perPage = 5

  function formatDate(date: string) {
    return new Date(date).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }

  // FILTER + SEARCH
  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.namaPeminjam.toLowerCase().includes(search.toLowerCase()) ||
        item.namaRuangan.toLowerCase().includes(search.toLowerCase())

      const matchStatus =
        statusFilter === "all" ||
        item.status.toString() === statusFilter

      return matchSearch && matchStatus
    })
  }, [data, search, statusFilter])

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / perPage)

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  )

  return (
    <div className="bg-white rounded-2xl shadow border p-5">

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari nama / ruangan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="border px-3 py-2 rounded-lg text-sm w-full md:w-72"
        />

        {/* FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(1)
          }}
          className="border px-3 py-2 rounded-lg text-sm w-full md:w-52"
        >
          <option value="all">Semua Status</option>
          <option value="0">Menunggu</option>
          <option value="1">Disetujui</option>
          <option value="2">Ditolak</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Nama",
                "Ruangan",
                "Mulai",
                "Selesai",
                "Keperluan",
                "Status",
                "Aksi",
              ].map((h) => (
                <th key={h} className="px-4 py-3 border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {item.namaPeminjam}
                  </td>
                  <td className="border px-4 py-2">
                    {item.namaRuangan}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(item.tanggalMulai)}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(item.tanggalSelesai)}
                  </td>
                  <td className="border px-4 py-2">
                    {item.keperluan}
                  </td>
                  <td className="border px-4 py-2">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-3">
                      <Link
                        to={`/detail/${item.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Detail
                      </Link>

                      <Link
                        to={`/edit/${item.id}`}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={async () => {
                        const confirmDelete = confirm("Yakin ingin menghapus data ini?")
                        if (!confirmDelete) return

                        try {
                        await deletePeminjaman(item.id)
                        window.location.reload()
                        } catch {
                         alert("Gagal menghapus data")
                        }
                        }}
                         className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="px-4 py-1 text-sm">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
