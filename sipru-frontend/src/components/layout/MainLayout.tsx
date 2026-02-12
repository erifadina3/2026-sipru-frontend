type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-lg font-bold mb-6">
          SIPRU
        </h2>

        <nav className="space-y-3 text-sm">
          <a href="#" className="block hover:text-blue-600">
            Dashboard
          </a>
          <a href="#" className="block hover:text-blue-600">
            Peminjaman
          </a>
          <a href="#" className="block hover:text-blue-600">
            Ruangan
          </a>
        </nav>
      </aside>


      {/* CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  )
}
