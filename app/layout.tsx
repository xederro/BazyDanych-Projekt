import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import { Cpu } from 'lucide-react'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const productCategories = [
  'dyski_twarde_HDD_i_SSD',
  'karty_graficzne',
  'procesory',
  'plyty_glowne',
  'obudowy_komputerowe',
  'pamieci_RAM',
  'zasilacze_komputerowe',
  'chlodzenia_komputerowe',
  'karty_dzwiekowe',
  'karty_przechwytujace_wideo',
  'karty_sieciowe',
  'napedy_optyczne',
  'akcesoria_do_dyskow',
  'inne'
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <nav className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Products</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {productCategories.map((category, index) => (
                      <DropdownMenuItem key={index}>
                        <a href="#" className="w-full">{category.replace(/_/g, ' ')}</a>
                      </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">Orders</Button>
              {!hasEnvVars ? <EnvVarWarning/> : <HeaderAuth/>}
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
              &copy; 2024 komputery.express. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
    </body>
    </html>
  );
}
