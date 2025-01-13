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
  const [nameSortOrder, setNameSortOrder] = useState('asc')
  const [whichSort, setWhichSort] = useState('name')

  const filteredAndSorted = whichSort === 'price' ? data
    ?.filter((products: { name: string }) => products.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price) :
    data?.filter((products: { name: string }) => products.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => nameSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setWhichSort('price')
  }

  const toggleNameSortOrder = () => {
    setNameSortOrder(nameSortOrder === 'asc' ? 'desc' : 'asc')
    setWhichSort('name')
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Products</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs mx-auto"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button onClick={toggleNameSortOrder} className="flex items-center">
                Name
                {nameSortOrder === 'asc' ? (
                    <ChevronUp className="ml-1 h-4 w-4"/>
                ) : (
                    <ChevronDown className="ml-1 h-4 w-4"/>
                )}
              </button>
            </TableHead>
            <TableHead className="flex place-self-end">
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
          {filteredAndSorted.map((product) => (
            <TableRow key={product.product_id}>
                <TableCell>
                  <Link href={"/product/"+product.product_id}>
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="text-end">{product.price.toFixed(2)} zł</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}