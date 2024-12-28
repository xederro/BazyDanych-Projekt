'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, Minus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const product = {
  name: "AMD Ryzen 9 5950X",
  price: 799.99,
  image: "/placeholder.svg",
  description: "The AMD Ryzen 9 5950X is a high-end desktop processor that delivers exceptional multi-threaded performance for demanding tasks such as content creation, 3D rendering, and gaming. With its 16 cores and 32 threads, this CPU offers unparalleled processing power for enthusiasts and professionals alike.",
  specifications: [
    { name: "Cores", value: "16" },
    { name: "Threads", value: "32" },
    { name: "Base Clock", value: "3.4 GHz" },
    { name: "Max Boost Clock", value: "Up to 4.9 GHz" },
    { name: "Total L2 Cache", value: "8 MB" },
    { name: "Total L3 Cache", value: "64 MB" },
    { name: "Default TDP", value: "105W" },
    { name: "Processor Technology for CPU Cores", value: "TSMC 7nm FinFET" },
    { name: "CPU Socket", value: "AM4" },
    { name: "Thermal Solution", value: "Not included" },
  ]
}

const initialProductCopies = [
  { serialNumber: "AMD5950X-001", status: "In Stock" },
  { serialNumber: "AMD5950X-002", status: "Sold" },
  { serialNumber: "AMD5950X-003", status: "In Stock" },
  { serialNumber: "AMD5950X-004", status: "Sold" },
  { serialNumber: "AMD5950X-005", status: "In Stock" },
]

export function ProductDetailsMagazynier() {
  const [productCopies, setProductCopies] = useState(initialProductCopies)

  const addUnit = () => {
    const newSerialNumber = `AMD5950X-${String(productCopies.length + 1).padStart(3, '0')}`
    setProductCopies([...productCopies, { serialNumber: newSerialNumber, status: "In Stock" }])
  }

  const removeUnit = (serialNumber: string) => {
    setProductCopies(productCopies.filter(copy => copy.serialNumber !== serialNumber))
  }

  return (
      <>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
              width={600}
              height={400}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Specifications</h2>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-medium">{spec.name}:</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Product Copies</h2>
            <Button onClick={addUnit} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Unit
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productCopies.map((copy, index) => (
                <TableRow key={index}>
                  <TableCell>{copy.serialNumber}</TableCell>
                  <TableCell>{copy.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => removeUnit(copy.serialNumber)} variant="outline" size="sm">
                      <Minus className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
  )
}