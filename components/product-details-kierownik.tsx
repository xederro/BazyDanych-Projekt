'use client'

import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Edit, Trash} from 'lucide-react'
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
import {useRouter} from "next/navigation";
import {createClient} from "@/utils/supabase/client";

interface ProductProp {
  product?:
    {
      product_id: number,
      name: string,
      price: number,
      description: string,
      specification: {},
      category_id: string,
    }
}

export function ProductDetailsKierownik({product}: ProductProp) {
  const [isEditing, setIsEditing] = useState(false)
  const [changes, setProduct] = useState(product)
  const [spec, setSpec] = useState(product?.specification)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    let product = changes
    product.specification = spec
    try {
      const {error} = await supabase.from("products").update(product).eq("product_id", product.product_id);
      if (!!error) throw error;
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      const {error} = await supabase.from("products").update({available: false}).eq("product_id", product.product_id);
      if (!!error) throw error;
      router.push("/products/"+product.category_id);
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setProduct(prev => ({...prev, [name]: name === 'price' ? parseFloat(value) : value}))
  }

  const handleSpecChange = (index: string, field: 'name' | 'value', value: string) => {
    if (field === 'name') {
      setSpec(prev => ({...prev, [value]: prev[index]}))
      setSpec(prev => (delete prev[index] && prev))
    } else {
      setSpec(prev => ({...prev, [index]: value}))
    }
  }



  return (
    <>
      <div className="grid md:grid-cols-1 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            {isEditing ? (
              <Input
                name="name"
                value={changes.name}
                onChange={handleChange}
                className="text-3xl font-bold"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900">{changes.name}</h1>
            )}
            <div className="flex space-x-2">
              <Button onClick={handleEdit} variant="outline" size="icon">
                <Edit className="h-4 w-4"/>
                <span className="sr-only">Edit product</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4"/>
                    <span className="sr-only">Delete product</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the product from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          {isEditing ? (
            <Input
              name="price"
              type="number"
              value={changes.price}
              onChange={handleChange}
              className="text-2xl font-bold mb-6"
            />
          ) : (
            <p className="text-2xl font-bold text-gray-900 mb-6">{changes.price.toFixed(2)}zł</p>
          )}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={changes.description}
                  onChange={handleChange}
                  rows={5}
                />
              ) : (
                <p className="text-gray-700">{changes.description}</p>
              )}
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Specifications</h2>
              <ul className="space-y-2">
                {Object.entries(spec).map(([k, v]) => (
                  <li key={k} className="flex justify-between">
                    {isEditing ? (
                      <>
                        <Input
                          value={k}
                          onChange={(e) => handleSpecChange(k, 'name', e.target.value)}
                          className="w-1/2 mr-2"
                        />
                        <Input
                          value={v}
                          onChange={(e) => handleSpecChange(k, 'value', e.target.value)}
                          className="w-1/2"
                        />
                      </>
                    ) : (
                      <>
                        <span className="font-medium"
                              style={{textTransform: "capitalize"}}>{k.replaceAll("_", " ")}:</span>
                        <span className="text-gray-600">{v}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          {isEditing && (
            <Button onClick={handleSave} className="mt-6">
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </>
  )
}