'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Monitor } from "lucide-react"
import {SubmitButton} from "@/components/submit-button";
import {signUpAction} from "@/app/actions";
import {FormMessage, Message} from "@/components/form-message";

export function RegisterPageComponent({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
        <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
          <FormMessage message={searchParams} />
        </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <Monitor className="mx-auto h-12 w-12 text-primary"/>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign up to Z-Kom</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or{" "}
                  <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
                    already have an account?
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

                <div>
                  <SubmitButton pendingText="Signing Up..." className="w-full" formAction={signUpAction}>
                    Sign up
                  </SubmitButton>
                  <FormMessage message={searchParams} />
                </div>
              </form>
              {/*<div className="mt-6">*/}
              {/*  <div className="relative">*/}
              {/*    <div className="absolute inset-0 flex items-center">*/}
              {/*      <div className="w-full border-t border-gray-300"/>*/}
              {/*    </div>*/}
              {/*    <div className="relative flex justify-center text-sm">*/}
              {/*      <span className="bg-gray-100 px-2 text-gray-500">Or continue with</span>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="mt-6 grid grid-cols-3 gap-3">*/}
              {/*    <Button variant="outline" className="w-full">*/}
              {/*      Google*/}
              {/*    </Button>*/}
              {/*    <Button variant="outline" className="w-full">*/}
              {/*      Facebook*/}
              {/*    </Button>*/}
              {/*    <Button variant="outline" className="w-full">*/}
              {/*      Apple*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}