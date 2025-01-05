'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

export function OrderDetails() {
  const totalValue = initialOrderDetails.products.reduce((sum, product) => sum + product.quantity * product.price, 0)

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
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{initialOrderDetails.clientName}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{initialOrderDetails.orderId}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{initialOrderDetails.date}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{initialOrderDetails.status}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Ordered Products</h2>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialOrderDetails.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.quantity}
              </TableCell>
              <TableCell>{product.price.toFixed(2)}zł</TableCell>
              <TableCell>{(product.quantity * product.price).toFixed(2)}zł</TableCell>
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