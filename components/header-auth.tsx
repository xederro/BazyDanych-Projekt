import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {User} from "lucide-react";

export default async function AuthButton({mobile}:{mobile:boolean}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (mobile) {
    return user ? (
      <>
        <span className="flex items-center  text-lg font-semibold hover:text-violet-600">
          <User className="h-5 w-5 text-violet-600 mr-2"/>
          <span className="text-gray-700">{user.email}</span>
          <form action={signOutAction}>
            <Button type="submit" variant={"outline"} className="text-lg font-semibold hover:text-violet-600">
              Sign out
            </Button>
          </form>
        </span>
      </>
    ) : (
      <>
        <Link href="/sign-in" className="text-lg font-semibold hover:text-violet-600">
          Sign in
        </Link>
      </>
    );
  } else {
    return user ? (
      <>
        <div className="flex items-center">
          <User className="h-5 w-5 text-violet-600 mr-2"/>
          <span className="text-sm font-medium text-gray-700">{user.email}</span>
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant={"outline"}>
            Sign out
          </Button>
        </form>
      </>
    ) : (
      <>
        <Button variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </>
    );
  }
}
