'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialOrders = [
  { id: 'ORD001', date: '2024-03-01', status: 'Delivered', totalCost: 1299.99 },
  { id: 'ORD002', date: '2024-03-05', status: 'Processing', totalCost: 799.50 },
  { id: 'ORD003', date: '2024-03-10', status: 'Shipped', totalCost: 2499.99 },
  { id: 'ORD004', date: '2024-03-15', status: 'Processing', totalCost: 599.99 },
  { id: 'ORD005', date: '2024-03-20', status: 'Delivered', totalCost: 1799.99 },
]

export function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [filterCode, setFilterCode] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedOrders = orders
    .filter(order => order.id.toLowerCase().includes(filterCode.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter by order code"
          value={filterCode}
          onChange={(e) => setFilterCode(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Code</TableHead>
            <TableHead>
              <button onClick={toggleSortOrder} className="flex items-center">
                Date
                {sortOrder === 'asc' ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>${order.totalCost.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}