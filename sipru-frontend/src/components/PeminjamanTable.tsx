import { useState, useMemo } from "react"
import type { Peminjaman } from "../types/Peminjaman"
import { deletePeminjaman } from "../services/peminjamanService"
import { updatePeminjaman } from "../services/peminjamanService"
import { Link } from "react-router-dom"
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa"

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
        <div style={{ position: "relative", width: "300px" }}>
          <FaSearch
           style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "#888"
           }}
          />
         <input
          type="text"
          placeholder="Cari Nama/Ruangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 10px 8px 35px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%"
          }}
         />
        </div>

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
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Nama Peminjam",
                "Kode – Ruangan",
                "Tanggal Mulai",
                "Tanggal Selesai",
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
                    <select
                      value={item.status}
                      onChange={async (e) => {
                        const newStatus = Number(e.target.value)

                        try {
                          await updatePeminjaman(item.id, {
                            ...item,
                            status: newStatus,
                          })

                          window.location.reload()
                        } catch {
                          alert("Gagal update status")
                        }
                      }}
                      className={`px-3 py-1 rounded-md text-sm font-medium border 
                        transition focus:outline-none focus:ring-2
                        ${
                          item.status === 1
                            ? "bg-green-100 text-green-700 border-green-300 focus:ring-green-200"
                            : item.status === 2
                            ? "bg-red-100 text-red-700 border-red-300 focus:ring-red-200"
                            : "bg-orange-100 text-orange-700 border-orange-300 focus:ring-orange-200"
                        }
                      `}
                    >
                      <option value={0}>Menunggu</option>
                      <option value={1}>Disetujui</option>
                      <option value={2}>Ditolak</option>
                    </select>
                  </td>
                 <td className="border px-4 py-2">
                  <div className="flex items-center gap-3">

                    <Link
                      to={`/detail/${item.id}`}
                      className="p-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-100 hover:scale-105 transition"
                      title="Detail"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/edit/${item.id}`}
                      className="p-2 rounded-md border border-yellow-300 text-yellow-600 hover:bg-yellow-100 hover:scale-105 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={async () => {
                        const confirmDelete = confirm("Yakin ingin menghapus data peminjaman ini?")
                        if (!confirmDelete) return

                        try {
                            await deletePeminjaman(item.id)
                            window.location.reload()
                        } catch {
                          alert("Gagal menghapus data")
                        }
                      }}
                      className="p-2 rounded-md border border-red-300 text-red-600 hover:bg-red-100 hover:scale-105 transition"
                      title="Delete"
                    >
                      <FaTrash />
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
