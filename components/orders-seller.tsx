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
import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";
import Link from "next/link";

interface OrdersProp {
  ordersList?:
    [Order]
}

interface Order {
  client_name: string,
  nip: string,
  order_id: number,
  date: number,
  status: string,
  cost: number,
}

export function OrdersSeller({ordersList}: OrdersProp) {
  const [orders, setOrders] = useState(ordersList)
  const [filterCode, setFilterCode] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedOrders = orders
    .filter(order => (order.order_id.toString()+order.client_name+order.nip+order.status).toLowerCase().includes(filterCode.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const supabase = createClient();
  const router = useRouter();

  const addOrder = () => {
    router.push("/order/create");
  }

  const removeOrder = async (id: string) => {
    try {
      const {error} = await supabase.from("orders").delete().eq("order_id", id);
      if (!!error) throw error;
      setOrders(orders.filter(order => order.order_id !== id))
    } catch (error) {
      console.error(error)
    }
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
            <TableHead>NIP</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedOrders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell><Link href={"/order/details/"+order.order_id}>{order.order_id}</Link></TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.client_name}</TableCell>
              <TableCell>{order.nip}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.cost.toFixed(2)}zł</TableCell>
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
                      <AlertDialogAction onClick={() => removeOrder(order.order_id)}>Remove</AlertDialogAction>
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