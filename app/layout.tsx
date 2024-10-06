import Link from "next/link";
import "./globals.css";
import {Menu, Monitor, ShoppingCart, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {createClient} from "@/utils/supabase/server";
import {signOutAction} from "@/app/actions";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Z-Kom",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({children}: {children: React.ReactNode;}) {
  const {
    data: {user},
  } = await createClient().auth.getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <Link className="mr-6 flex items-center space-x-2" href="/">
                <Monitor className="h-6 w-6"/>
                <span className="hidden font-bold sm:inline-block">Z-Kom</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="/products">Products</Link>
                <Link href="/services">Services</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>
            <Button variant="outline" size="icon"
                    className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden">
              <Menu className="h-5 w-5"/>
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <Input className="w-full md:w-[300px]" placeholder="Search products..." type="search"/>
              </div>
              <div className="flex items-center space-x-2">
                {user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="relative h-8 w-8 rounded-full">
                          <User className="h-5 w-5"/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Welcome,</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <form action={signOutAction}>
                      <Button type="submit" variant="outline">
                        Sign out
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Button variant="outline"><Link href="/sign-in">Sign in</Link></Button>
                    <Button variant="outline"><Link href="/sign-up">Sign up</Link></Button>
                  </>
                )}
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5"/>
                  <span className="sr-only">Shopping Cart</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">© 2024 Z-Kom. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
