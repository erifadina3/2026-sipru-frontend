import type { Peminjaman } from "../types/Peminjaman"
import StatusBadge from "./StatusBadge"

interface Props {
  data: Peminjaman[]
}

export default function PeminjamanTable({ data }: Props) {

  function formatDate(date: string) {
    return new Date(date).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short"
    })
  }

  return (
    <table border={1} cellPadding={10} style={{ borderCollapse:"collapse", width:"100%" }}>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Ruangan</th>
          <th>Mulai</th>
          <th>Selesai</th>
          <th>Keperluan</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.namaPeminjam}</td>
            <td>{item.namaRuangan}</td>
            <td>{formatDate(item.tanggalMulai)}</td>
            <td>{formatDate(item.tanggalSelesai)}</td>
            <td>{item.keperluan}</td>
            <td><StatusBadge status={item.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
