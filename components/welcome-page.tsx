'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart, Truck, HeadphonesIcon, ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export function WelcomePageComponent() {
  return (
    <>
      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Welcome to komputery.express
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
              Your one-stop shop for premium computer components and accessories
            </p>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
                <Link href="/products">Shop Now<ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Why Choose komputery.express?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-6 w-6 text-violet-600 mr-2" />
                  Wide Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse through our extensive catalog of computer parts from top brands.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-6 w-6 text-violet-600 mr-2" />
                  Fast Shipping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Enjoy quick and reliable delivery right to your doorstep.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="h-6 w-6 text-violet-600 mr-2" />
                  Expert Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get assistance from our knowledgeable team for all your tech needs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}