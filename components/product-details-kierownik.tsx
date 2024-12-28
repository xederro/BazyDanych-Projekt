'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash, Upload } from 'lucide-react'
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

const initialProduct = {
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

export function ProductDetailsKierownik() {
  const [isEditing, setIsEditing] = useState(false)
  const [product, setProduct] = useState(initialProduct)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the changes to a backend
    console.log("Saving changes:", product)
  }

  const handleDelete = () => {
    // Here you would typically delete the product from the backend
    console.log("Deleting product:", product.name)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }))
  }

  const handleSpecChange = (index: number, field: 'name' | 'value', value: string) => {
    setProduct(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProduct(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
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
          {isEditing && (
            <div className="mt-4">
              <Input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                id="product-image"
                className="sr-only"
              />
              <label
                htmlFor="product-image"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="mr-2 h-4 w-4" />
                Change Image
              </label>
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            {isEditing ? (
              <Input
                name="name"
                value={product.name}
                onChange={handleChange}
                className="text-3xl font-bold"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            )}
            <div className="flex space-x-2">
              <Button onClick={handleEdit} variant="outline" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit product</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
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
              value={product.price}
              onChange={handleChange}
              className="text-2xl font-bold mb-6"
            />
          ) : (
            <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          )}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
              {isEditing ? (
                <Textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={5}
                />
              ) : (
                <p className="text-gray-700">{product.description}</p>
              )}
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Specifications</h2>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex justify-between">
                    {isEditing ? (
                      <>
                        <Input
                          value={spec.name}
                          onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                          className="w-1/2 mr-2"
                        />
                        <Input
                          value={spec.value}
                          onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                          className="w-1/2"
                        />
                      </>
                    ) : (
                      <>
                        <span className="font-medium">{spec.name}:</span>
                        <span className="text-gray-600">{spec.value}</span>
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