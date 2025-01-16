import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

import {Cpu, Menu} from 'lucide-react'
import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {NavMenu} from "@/components/nav-menu";
import HeaderAuth from "@/components/header-auth";
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {ScrollArea} from "@/components/ui/scroll-area";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Komputery express",
  description: "Your one-stop shop for premium computer components and accessories",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const role = cookieStore.get("role")
  const supabase = await createClient();
  const { data: productCategories } = await supabase.from("categories").select();
    return (
      <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
      <div className="flex flex-col min-h-screen bg-white">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Cpu className="h-8 w-8 text-violet-600 mr-2"/>
                <Link href="/" className="text-xl font-bold text-gray-900">komputery.express</Link>
              </div>

              <nav className="flex items-center space-x-4">
                {/* Mobile Menu */}
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <ScrollArea className="h-[90vh]">
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-col gap-4 mt-4">
                        <NavMenu categories={productCategories}/>
                        {
                          role?role.value == "kierownik"?<>
                                <Link href="/report" className="text-lg font-semibold hover:text-violet-600">
                                  Report
                                </Link>
                                <Link href="/order" className="text-lg font-semibold hover:text-violet-600">
                                  Orders
                                </Link>
                              </>
                              :
                              <Link href="/order" className="text-lg font-semibold hover:text-violet-600">
                                Orders
                              </Link>
                            :
                            <></>
                        }
                        <HeaderAuth mobile={true}/>
                      </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                </div>
                {/* Desktop Menu - Rest of the code remains unchanged */}
                <div className="hidden md:flex items-center space-x-4">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-1 col-span-2">
                              <NavigationMenuLink asChild>
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-violet-500 to-violet-900 p-6 no-underline outline-none focus:shadow-md"
                                  href="/products"
                                >
                                  <Cpu className="h-6 w-6 text-white" />
                                  <div className="mt-4 mb-2 text-lg font-medium text-white">
                                    Computer Components
                                  </div>
                                  <p className="text-sm leading-tight text-white/90">
                                    Explore our wide range of high-quality computer parts and accessories.
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            {productCategories.map((product, index) => (
                              <Link
                                href={"/products/" + product.category_id}
                                key={product.category_id}
                                className="block p-2 hover:bg-violet-50 rounded-mdrow-span-1 col-span-2"
                              >
                                <li>
                                  <NavigationMenuLink asChild>
                                    <div className="text-sm font-medium leading-none">{product.name}</div>
                                  </NavigationMenuLink>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  {
                    role?role.value == "kierownik"?
                        <>
                          <Button variant="outline" asChild>
                            <Link href="/report">Report</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/order">Orders</Link>
                          </Button>
                        </>
                        :
                        <Button variant="outline" asChild>
                          <Link href="/order">Orders</Link>
                        </Button>
                      :
                      <></>
                  }
                  <HeaderAuth mobile={false}/>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
                <p className="text-gray-600">Email: info@komputery.express</p>
                <p className="text-gray-600">Phone: +1 (123) 456-7890</p>
              </div>
              <div className="text-gray-600">
                &copy; 2025 komputery.express. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
      </body>
      </html>
  );
}
