'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Check, X, Plus, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
    { id: 1, name: "AMD Ryzen 9 5950X", quantity: 1, price: 699.99 },
    { id: 2, name: "NVIDIA GeForce RTX 3080", quantity: 1, price: 699.99 },
    { id: 3, name: "Samsung 970 EVO Plus 1TB", quantity: 2, price: 149.99 },
  ]
}

const availableProducts = [
  { id: 4, name: "Intel Core i9-11900K", price: 539.99 },
  { id: 5, name: "AMD Radeon RX 6800 XT", price: 649.99 },
  { id: 6, name: "Crucial P5 1TB NVMe SSD", price: 119.99 },
  { id: 7, name: "G.Skill Trident Z Neo 32GB", price: 189.99 },
  { id: 8, name: "ASUS ROG Strix X570-E Gaming", price: 299.99 },
]

export function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(initialOrderDetails)
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [editedQuantity, setEditedQuantity] = useState<number | null>(null)
  const [setIsAddingProduct] = useState(false)
  const [filterTerm, setFilterTerm] = useState('')
  const [newProductQuantity, setNewProductQuantity] = useState(1)

  const totalValue = orderDetails.products.reduce((sum, product) => sum + product.quantity * product.price, 0)

  const handleEdit = (productId: number) => {
    setEditingProduct(productId)
    const product = orderDetails.products.find(p => p.id === productId)
    if (product) {
      setEditedQuantity(product.quantity)
    }
  }

  const handleSave = (productId: number) => {
    if (editedQuantity !== null) {
      setOrderDetails(prevDetails => ({
        ...prevDetails,
        products: prevDetails.products.map(product =>
          product.id === productId
            ? { ...product, quantity: editedQuantity }
            : product
        )
      }))
      setEditingProduct(null)
      setEditedQuantity(null)
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setEditedQuantity(null)
  }

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase())
  )

  const handleAddProduct = (product: typeof availableProducts[0]) => {
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      products: [...prevDetails.products, { ...product, quantity: newProductQuantity }]
    }))
    setIsAddingProduct(false)
    setFilterTerm('')
    setNewProductQuantity(1)
  }

  const handleRemoveProduct = (productId: number) => {
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      products: prevDetails.products.filter(product => product.id !== productId)
    }))
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

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Ordered Products</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="filter">Filter Products</Label>
                <Input
                  id="filter"
                  value={filterTerm}
                  onChange={(e) => setFilterTerm(e.target.value)}
                  placeholder="Type to filter products"
                />
              </div>
              <div className="max-h-60 overflow-auto">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center py-2">
                    <span>{product.name} - {product.price.toFixed(2)}zł</span>
                    <Button onClick={() => handleAddProduct(product)}>Add</Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetails.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {editingProduct === product.id ? (
                  <Input
                    type="number"
                    value={editedQuantity ?? ''}
                    onChange={(e) => setEditedQuantity(parseInt(e.target.value))}
                    className="w-20"
                  />
                ) : (
                  product.quantity
                )}
              </TableCell>
              <TableCell>{product.price.toFixed(2)}zł</TableCell>
              <TableCell>{(product.quantity * product.price).toFixed(2)}zł</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {editingProduct === product.id ? (
                    <>
                      <Button onClick={() => handleSave(product.id)} size="sm" variant="outline">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleEdit(product.id)} size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will remove the product from the order. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveProduct(product.id)}>
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total Order Value: {totalValue.toFixed(2)}zł</p>
      </div>
    </>
  )
}