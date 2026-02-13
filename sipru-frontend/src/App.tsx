import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import PeminjamanList from "./pages/PeminjamanList"
import TambahPeminjaman from "./pages/TambahPeminjaman"
import PeminjamanDetail from "./pages/PeminjamanDetail"
import EditPeminjaman from "./pages/EditPeminjaman"

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <h1 className="text-2xl font-semibold mb-4">
          Sistem Peminjaman Ruangan Kampus
        </h1>

        <Routes>
          <Route path="/" element={<PeminjamanList />} />
          <Route path="/tambah" element={<TambahPeminjaman />} />
          <Route path="/detail/:id" element={<PeminjamanDetail />} />
          <Route path="/edit/:id" element={<EditPeminjaman />} />
        </Routes>

      </MainLayout>
    </BrowserRouter>
  )
}
