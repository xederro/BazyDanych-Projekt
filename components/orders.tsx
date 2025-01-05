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
import Link from "next/link";

interface OrdersProp {
  ordersList?:
    [{
      order_id: number,
      date: number,
      status: string
    }]
}

export function Orders({ordersList}: OrdersProp) {
  const [orders, setOrders] = useState(ordersList)
  const [filterCode, setFilterCode] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedOrders = orders
    .filter(order => order.order_id.toString().toLowerCase().includes(filterCode.toLowerCase()))
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedOrders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell><Link href={"/order/details/"+order.order_id}>{order.order_id}</Link></TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}