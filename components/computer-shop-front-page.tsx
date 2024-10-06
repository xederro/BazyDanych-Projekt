'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Cpu, HardDrive, Laptop } from "lucide-react"

export function ComputerShopFrontPageComponent() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Welcome to Z-Kom
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Your one-stop shop for all your computing needs. From custom builds to the latest tech, we've got you covered.
              </p>
            </div>
            <div className="space-x-4">
              <Button>Shop Now</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Custom Gaming PC", icon: Cpu, price: "$1299" },
              { name: "4K Monitor", icon: Monitor, price: "$499" },
              { name: "1TB SSD", icon: HardDrive, price: "$129" },
              { name: "Ultrabook Laptop", icon: Laptop, price: "$999" },
            ].map((product, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <product.icon className="h-6 w-6" />
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square relative bg-gray-200 rounded-md">
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt={product.name}
                      className="absolute inset-0 object-cover rounded-md"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-2xl font-bold">{product.price}</span>
                  <Button>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Z-Kom?</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer expert advice, competitive prices, and top-notch customer service. Our team is passionate about technology and dedicated to helping you find the perfect solution.
              </p>
            </div>
            <Button className="w-full sm:w-auto">Learn More About Us</Button>
          </div>
        </div>
      </section>
    </>
  )
}