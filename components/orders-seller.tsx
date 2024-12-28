'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp, ChevronDown, Plus, Trash } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const initialOrders = [
  { id: 'ORD001', date: '2024-03-01', status: 'Submitted', totalCost: 1299.99, customer: 'John Doe' },
  { id: 'ORD002', date: '2024-03-05', status: 'Processing', totalCost: 799.50, customer: 'Jane Smith' },
  { id: 'ORD003', date: '2024-03-10', status: 'Shipped', totalCost: 2499.99, customer: 'Bob Johnson' },
  { id: 'ORD004', date: '2024-03-15', status: 'Processing', totalCost: 599.99, customer: 'Alice Brown' },
  { id: 'ORD005', date: '2024-03-20', status: 'Submitted', totalCost: 1799.99, customer: 'Charlie Wilson' },
]

export function OrdersSeller() {
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

  const addOrder = () => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      totalCost: 0,
      customer: 'New Customer'
    }
    setOrders([...orders, newOrder])
  }

  const removeOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
        <Button onClick={addOrder} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Order
        </Button>
      </div>
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
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>${order.totalCost.toFixed(2)}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to remove this order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the order from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeOrder(order.id)}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}