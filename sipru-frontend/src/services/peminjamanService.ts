import type { Peminjaman } from "../types/Peminjaman"

const BASE_URL = "http://localhost:5153/api/peminjaman"

export async function getPeminjaman(): Promise<Peminjaman[]> {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    throw new Error("Failed fetch data")
  }

  return res.json()
}
