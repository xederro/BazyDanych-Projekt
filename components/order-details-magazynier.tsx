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
import {createClient} from "@/utils/supabase/client";

interface OrderProp {
  products:[{
    name: string,
    count: number,
    product_id: number,
    order_id: number,
    units: string[]
  }],
  order: {
    order_id: number,
    date: number,
    status: string
  }
}

export function OrderDetailsMagazynier({products, order}: OrderProp) {
  const supabase = createClient();
  const [productsDetails, setProductsDetails] = useState(products.map(product => {return {...product, units: product.units.filter(unit => unit !== null)}}))
  const [newSerialNumber, setNewSerialNumber] = useState('')
  const [expandedProducts, setExpandedProducts] = useState<string[]>([])

  const handleAddUnit = async () => {
    if (newSerialNumber.trim() === '') return
    try {
      const {data, error} = await supabase.from("units").update({order_id: order.order_id}).is("order_id", null).eq("unit_id", newSerialNumber).select().maybeSingle();
      if (!!error) throw error;

      const updatedProducts = productsDetails.map(product => {
        if (product.product_id === data.product_id) {
          return {
            ...product,
            units: [...product.units, newSerialNumber]
          }
        }
        return product
      })

      setProductsDetails(updatedProducts)
      setNewSerialNumber('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveUnit = async (productId: number, serialNumber: string) => {
    try {
      const {error} = await supabase.from("units").update({order_id: null}).eq("unit_id", serialNumber).eq("order_id", order.order_id);
      if (!!error) throw error;

      const updatedProducts = productsDetails.map(product => {
        if (product.product_id === productId) {
          return {
            ...product,
            units: product.units.filter(unit => unit !== serialNumber)
          }
        }
        return product
      })

      setProductsDetails(updatedProducts)
    } catch (error) {
      console.error(error)
    }
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
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.order_id}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ new Date(order.date).toLocaleDateString() }</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.status}</dd>
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
          {productsDetails.map((product) => (
            <AccordionItem key={product.product_id} value={product.product_id.toString()}>
              <AccordionTrigger onClick={() => toggleProductExpansion(product.product_id.toString())}>
                <div className="flex justify-between items-center w-full">
                  <span>{product.name}</span>
                  <span className="text-sm text-gray-500">
                      {product.units.length} / {product.count} units
                    </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.units.map((unit) => (
                      <TableRow key={unit}>
                        <TableCell>{unit}</TableCell>
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
                                <AlertDialogAction onClick={() => handleRemoveUnit(product.product_id, unit)}>
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
    </>
  )
}