'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

const initialOrderDetails = {
  clientName: "Jane Smith",
  orderId: "ORD002",
  date: "2024-03-05",
  status: "Processing",
  products: [
    { 
      id: 1, 
      name: "AMD Ryzen 9 5950X", 
      quantity: 2, 
      price: 699.99,
      units: [
        { serialNumber: "RYZ5950X-001", status: "In Stock" },
        { serialNumber: "RYZ5950X-002", status: "In Stock" },
      ]
    },
    { 
      id: 2, 
      name: "NVIDIA GeForce RTX 3080", 
      quantity: 1, 
      price: 699.99,
      units: [
        { serialNumber: "RTX3080-001", status: "In Stock" },
      ]
    },
    { 
      id: 3, 
      name: "Samsung 970 EVO Plus 1TB", 
      quantity: 2, 
      price: 149.99,
      units: [
        { serialNumber: "SAM970EVO-001", status: "In Stock" },
        { serialNumber: "SAM970EVO-002", status: "In Stock" },
      ]
    },
  ]
}

export function OrderDetailsMagazynier() {
  const [orderDetails, setOrderDetails] = useState(initialOrderDetails)
  const [newSerialNumber, setNewSerialNumber] = useState('')
  const [expandedProducts, setExpandedProducts] = useState<string[]>([])

  const totalValue = orderDetails.products.reduce((sum, product) => sum + product.quantity * product.price, 0)

  const handleAddUnit = () => {
    if (newSerialNumber.trim() === '') return

    const updatedProducts = orderDetails.products.map(product => {
      if (product.units.length < product.quantity) {
        return {
          ...product,
          units: [...product.units, { serialNumber: newSerialNumber, status: "In Stock" }]
        }
      }
      return product
    })

    setOrderDetails(prevDetails => ({
      ...prevDetails,
      products: updatedProducts
    }))
    setNewSerialNumber('')
  }

  const handleRemoveUnit = (productId: number, serialNumber: string) => {
    const updatedProducts = orderDetails.products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          units: product.units.filter(unit => unit.serialNumber !== serialNumber)
        }
      }
      return product
    })

    setOrderDetails(prevDetails => ({
      ...prevDetails,
      products: updatedProducts
    }))
  }

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Details</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Order Information
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Client Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.clientName}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.orderId}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.date}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderDetails.status}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ordered Products</h2>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Enter serial number"
            value={newSerialNumber}
            onChange={(e) => setNewSerialNumber(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleAddUnit} variant="secondary" className="bg-violet-600 text-white hover:bg-violet-700">
            <Plus className="mr-2 h-4 w-4"/> Add Unit
          </Button>
        </div>
        <Accordion type="multiple" value={expandedProducts} onValueChange={setExpandedProducts}>
          {orderDetails.products.map((product) => (
            <AccordionItem key={product.id} value={product.id.toString()}>
              <AccordionTrigger onClick={() => toggleProductExpansion(product.id.toString())}>
                <div className="flex justify-between items-center w-full">
                  <span>{product.name}</span>
                  <span className="text-sm text-gray-500">
                      {product.units.length} / {product.quantity} units
                    </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.units.map((unit) => (
                      <TableRow key={unit.serialNumber}>
                        <TableCell>{unit.serialNumber}</TableCell>
                        <TableCell>{unit.status}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4"/>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will remove the unit from the order. This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveUnit(product.id, unit.serialNumber)}>
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total Order Value: ${totalValue.toFixed(2)}</p>
      </div>
    </>
  )
}