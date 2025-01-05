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

export function ProductDetailsMagazynier({ product, units }: ProductProp) {
  const [productCopies, setProductCopies] = useState(units);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitId, setUnitId] = useState('');
  const supabase = createClient();

  const addUnit = async () => {
    if (!unitId) return; // Ensure unitId is provided
    try {
      const { error } = await supabase.from("units").insert({ unit_id: unitId, product_id: product.product_id });
      if (error) throw error;
      setProductCopies((prevCopies) => [...prevCopies, { unit_id: unitId, status: "In Stock" }]);
      setUnitId(''); // Clear the input field after successful insertion
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error(error);
    }
  }

  const removeUnit = async (serialNumber: string) => {
    try {
      const { error } = await supabase.from("units").delete().eq("unit_id", serialNumber);
      if (error) throw error;
      setProductCopies((prevCopies) => prevCopies.filter(copy => copy.unit_id !== serialNumber));
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <>
        <div className="grid md:grid-cols-1 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-900 mb-6">{product.price.toFixed(2)}zł</p>
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
                          style={{ textTransform: "capitalize" }}>{k.replaceAll("_", " ")}:</span>
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
            <Button onClick={() => setIsModalOpen(true)} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Unit
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
                {productCopies.map((unit) => (
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

        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add New Unit</h2>
                <input
                    type="text"
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    placeholder="Enter Unit ID"
                    className="border p-2 rounded w-full mb-4"
                />
                <div className="flex justify-end space-x-4">
                  <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
                  <Button onClick={addUnit} variant="solid">Add</Button>
                </div>
              </div>
            </div>
        )}
      </>
  )
}