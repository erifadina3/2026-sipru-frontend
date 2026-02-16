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
        <Routes>
          <Route path="/" element={<PeminjamanList />} />
          <Route path="/tambah" element={<TambahPeminjaman />} />
          <Route path="/detail/:id" element={<PeminjamanDetail />} />
          <Route path="/edit/:id" element={<EditPeminjaman />} />
          <Route path="/ruangan" element={<div>Halaman Ruangan</div>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
