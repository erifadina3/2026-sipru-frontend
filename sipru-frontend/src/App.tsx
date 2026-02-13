import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import PeminjamanList from "./pages/PeminjamanList"
import EditPeminjaman from "./pages/EditPeminjaman"


function App() {
  return (
    <BrowserRouter> 
      <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">
        Sistem Peminjaman Ruangan Kampus 
      </h1>
      
      <Routes>
      <Route path="/" element={<PeminjamanList />} />
      <Route path="/edit/:id" element={<EditPeminjaman />} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
