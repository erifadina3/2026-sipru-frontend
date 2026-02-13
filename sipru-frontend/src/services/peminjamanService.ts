import type { Peminjaman } from "../types/Peminjaman"

const BASE_URL = "http://localhost:5153/api/peminjaman"

// GET ALL
export async function getPeminjaman(): Promise<Peminjaman[]> {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    const text = await res.text()
    console.error("API ERROR:", text)
    throw new Error("Failed fetch data")
  }

  return res.json()
}

// GET BY ID
export async function getPeminjamanById(id: number): Promise<Peminjaman> {
  const res = await fetch(`${BASE_URL}/${id}`)

  if (!res.ok) {
    const text = await res.text()
    console.error("API ERROR:", text)
    throw new Error("Failed fetch detail")
  }

  return res.json()
}

// CREATE
export async function createPeminjaman(
  data: Omit<Peminjaman, "id">
): Promise<Peminjaman> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("API ERROR:", text)
    throw new Error("Failed create data")
  }

  return res.json()
}
