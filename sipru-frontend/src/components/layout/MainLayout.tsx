type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-50/80 backdrop-blur-sm border-r border-slate-200 p-6 flex flex-col">

        {/* ADMIN SECTION */}
        <div className="flex items-center gap-3 mb-10">
          <div className="text-3xl">👩‍💻</div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">
              Hi! Admin
            </h3>
            <p className="text-xs text-slate-500">
              SIPRU System
            </p>
          </div>
        </div>

        {/* MENU (hiasan saja) */}
        <nav className="space-y-2 text-sm">
          <div className="px-3 py-2 rounded-md bg-blue-100 text-blue-700 font-medium">
            Dashboard
          </div>

          <div className="px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 transition cursor-default">
            Peminjaman
          </div>

          <div className="px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 transition cursor-default">
            Ruangan
          </div>
        </nav>

      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="px-8 pt-6 pb-4 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-800">
            Sistem Peminjaman Ruangan Kampus
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data peminjaman ruangan kampus
          </p>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="text-center text-sm text-slate-500 py-4 border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm">
          © 2026 SIPRU website • by Nur Legia Erifadina
        </footer>

      </div>

    </div>
  )
}
