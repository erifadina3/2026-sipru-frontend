import React from "react"

interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
}

export default function Table<T>({
  columns,
  data,
  emptyMessage = "Data kosong",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow border bg-white">
      <table className="w-full text-sm text-left border-collapse">
        
        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-6 py-4 font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                {columns.map((col, colIndex) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : row[col.accessor]

                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {value as React.ReactNode}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
