'use client'
import Link from "next/link";
import {ChevronDown, Cpu, Menu} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

interface Categories {
  categories: [
    {
      category_id: number
      name: string
    }
  ]
}

export function NavMenu({categories}:Categories) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  return (
      <>
        <Collapsible
          open={isProductsOpen}
          onOpenChange={setIsProductsOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold hover:text-violet-600">
            Products
            <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? "transform rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pl-4">
            <div className="rounded-md bg-gradient-to-b from-violet-500 to-violet-900 p-4 mb-4">
              <div className="flex items-center mb-2">
                <Link href="/products" className="w-full">
                  <Cpu className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">Computer Components</span>
                </Link>
              </div>
              <p className="text-sm text-white/90">
                Explore our wide range of high-quality computer parts and accessories.
              </p>
            </div>
            {categories.map((product, index) => (
              <Link
                href={"/products/" + product.category_id}
                key={product.category_id}
                className="block p-2 hover:bg-violet-50 rounded-md"
              >
                <div className="font-medium">{product.name}</div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </>
  )
}