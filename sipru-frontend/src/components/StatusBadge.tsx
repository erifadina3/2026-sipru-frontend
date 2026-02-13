interface Props {
  status: number
}

export default function StatusBadge({ status }: Props) {
  const map: Record<number, string> = {
    0: "Menunggu",
    1: "Disetujui",
    2: "Ditolak"
  }

  return (
    <span style={{
      padding: "4px 10px",
      borderRadius: 8,
      color: "white",
      background:
        status === 1 ? "green" :
        status === 2 ? "red" :
        "orange"
    }}>
      {map[status]}
    </span>
  )
}
