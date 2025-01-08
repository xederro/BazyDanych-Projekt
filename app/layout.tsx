import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import { Cpu } from 'lucide-react'
import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";

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
                <Cpu className="h-8 w-8 text-violet-600 mr-2" />
                <Link href="/" className="text-xl font-bold text-gray-900">komputery.express</Link>
              </div>
              <nav className="hidden md:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Products</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                      <Link href="/products" className="w-full">All Products</Link>
                    </DropdownMenuItem>
                    {productCategories.map((category) => (
                        <DropdownMenuItem key={category.category_id} asChild>
                          <Link href={"/products/" + category.category_id} className="w-full">{category.name}</Link>
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {
                  role?role.value == "kierownik"?
                    <Button variant="outline" asChild>
                      <Link href="/report">Report</Link>
                    </Button>
                    :
                    <Button variant="outline" asChild>
                      <Link href="/order">Orders</Link>
                    </Button>
                    :
                    <></>
                }
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
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
