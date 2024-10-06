'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Monitor } from "lucide-react"
import {SubmitButton} from "@/components/submit-button";
import {signInAction} from "@/app/actions";
import {FormMessage, Message} from "@/components/form-message";

export function LoginPageComponent({ searchParams }: { searchParams: Message }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <Monitor className="mx-auto h-12 w-12 text-primary"/>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to Z-Kom</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or{" "}
                  <Link href="/sign-up" className="font-medium text-primary hover:text-primary/80">
                    create a new account
                  </Link>
                </p>
              </div>
              <form className="mt-8 space-y-6">
                <div className="space-y-4 rounded-md shadow-sm">
                  <div>
                    <Label htmlFor="email-address" className="sr-only">
                      Email address
                    </Label>
                    <Input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="sr-only">
                      Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <SubmitButton pendingText="Signing In..." className="w-full" formAction={signInAction}>
                    Sign in
                  </SubmitButton>
                  <FormMessage message={searchParams} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}