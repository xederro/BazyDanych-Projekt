'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface OrderProp {
  order: {
    order_id: number,
    date: number,
    status: string,
    apartment_number?: string,
    home_number: string,
    place: string,
    street?: string,
    zip: string,
    products:[{
      product: string,
      count: number,
      price: number
    }],
  }
}

export function OrderDetails({order}:OrderProp) {
  console.log(order)
  const totalValue = order.products.reduce((sum, product) => sum + product.count * product.price, 0)

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
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.order_id}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd
                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(order.date).toLocaleDateString()}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.status}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address 1</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.street ? order.street + " " : ""}{order.home_number}{order.apartment_number ? "/" + order.apartment_number : ""}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address 2</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.zip} {order.place}</dd>
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
          {order.products.map((product) => (
            <TableRow key={product.product}>
              <TableCell>{product.product}</TableCell>
              <TableCell>
                {product.count}
              </TableCell>
              <TableCell>{product.price.toFixed(2)}zł</TableCell>
              <TableCell>{(product.count * product.price).toFixed(2)}zł</TableCell>
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