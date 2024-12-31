'use client'

import {useState} from 'react'
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {ChevronUp, ChevronDown} from 'lucide-react'
import Link from "next/link";

interface ProductsListProps {
  data?: [
    {
      product_id: number,
      name: string,
      price: number,
      available: boolean,
      category: string,
    }
  ]
}

export function ProductsList({data}: ProductsListProps) {
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredAndSorted = data
    ?.filter((products: { name: string }) => products.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
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
                  <ChevronUp className="ml-1 h-4 w-4"/>
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4"/>
                )}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSorted.map((cpu) => (
            <TableRow key={cpu.product_id}>
                <TableCell>
                  <Link href={"/product/"+cpu.product_id}>
                    {cpu.name}
                  </Link>
                </TableCell>
                <TableCell>${cpu.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}