'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronUp, ChevronDown } from 'lucide-react'

// Sample CPU data
const cpus = [
  { id: 1, name: 'Intel Core i9-11900K', price: 539.99, quantity: 15 },
  { id: 2, name: 'AMD Ryzen 9 5950X', price: 799.99, quantity: 8 },
  { id: 3, name: 'Intel Core i7-11700K', price: 399.99, quantity: 22 },
  { id: 4, name: 'AMD Ryzen 7 5800X', price: 449.99, quantity: 17 },
  { id: 5, name: 'Intel Core i5-11600K', price: 269.99, quantity: 30 },
]

export function ProductsList() {
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredAndSortedCPUs = cpus
    .filter(cpu => cpu.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">CPU Products</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>
              <button onClick={toggleSortOrder} className="flex items-center">
                Price
                {sortOrder === 'asc' ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedCPUs.map((cpu) => (
            <TableRow key={cpu.id}>
              <TableCell>{cpu.name}</TableCell>
              <TableCell>${cpu.price.toFixed(2)}</TableCell>
              <TableCell>{cpu.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}