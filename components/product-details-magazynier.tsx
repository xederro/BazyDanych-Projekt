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
import {ScrollArea} from "@/components/ui/scroll-area";
import {createClient} from "@/utils/supabase/client";

interface ProductProp {
  product?:
    {
      product_id: number,
      name: string,
      price: number,
      description: string,
      specification: string,
    },
  units:[{
    unit_id: string,
    status: string,
  }]
}

export function ProductDetailsMagazynier({product, units}: ProductProp) {
  const [productCopies, setProductCopies] = useState(units)
  const supabase = createClient();

  const addUnit = async () => {
    try {
      // TODO: zrobic by to sie kurde dobrze robilo nazwa jakiś nwm input xd bo bez tego troche sus
      // TODO: nie updatuje się ui z jakiejść przyczyny ??????
      const {error} = await supabase.from("units").insert({unit_id: "abecadlo", product_id: product.product_id});
      if (!!error) throw error;
      setProductCopies([...productCopies, { unit_id: "abecadlo", status: "In Stock" }])
    } catch (error) {
      console.error(error)
    }
  }

  const removeUnit = async (serialNumber: string) => {
    try {
      const {error} = await supabase.from("units").delete().eq("unit_id", serialNumber);
      if (!!error) throw error;
      setProductCopies(productCopies.filter(copy => copy.unit_id !== serialNumber))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-1 gap-8">
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
                {Object.entries(product.specification).map(([k, v]) => (
                  <li key={k} className="flex justify-between">
                      <span className="font-medium"
                            style={{textTransform: "capitalize"}}>{k.replaceAll("_", " ")}:</span>
                    <span className="text-gray-600">{v}</span>
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
            <Plus className="mr-2 h-4 w-4"/> Add Unit
          </Button>
        </div>
        <ScrollArea className="h-[700px] w-[500px] rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.unit_id}>
                  <TableCell>{unit.unit_id}</TableCell>
                  <TableCell>{unit.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => removeUnit(unit.unit_id)} variant="outline" size="sm">
                      <Minus className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  )
}