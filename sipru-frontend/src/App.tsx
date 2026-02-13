import MainLayout from "./components/layout/MainLayout"
import PeminjamanList from "./pages/PeminjamanList"

function App() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold mb-4">
        Sistem Peminjaman Ruangan Kampus 
      </h1>

      <PeminjamanList />
    </MainLayout>
  )
}

export default App
