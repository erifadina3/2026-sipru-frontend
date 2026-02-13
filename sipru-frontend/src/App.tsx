import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import PeminjamanList from "./pages/PeminjamanList"
import TambahPeminjaman from "./pages/TambahPeminjaman"

export default function App() {
  return (
    <BrowserRouter>
     <MainLayout> 
      <Routes>
        <Route path="/" element={<PeminjamanList />} />
        <Route path="/tambah" element={<TambahPeminjaman />} />
      </Routes>
     </MainLayout>
    </BrowserRouter>
  )
}