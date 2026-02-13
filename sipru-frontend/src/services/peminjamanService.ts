import type { Peminjaman } from "../types/Peminjaman"

const BASE_URL = "http://localhost:5153/api/peminjaman"

export async function getPeminjaman(): Promise<Peminjaman[]> {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    const text = await res.text()
    console.error("API ERROR:", text)
    throw new Error("Failed fetch data")
  }

  return (await res.json()) as Peminjaman[]
}

export async function updatePeminjaman(
  id: number,
  data: Partial<Peminjaman>
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Update gagal")
}

