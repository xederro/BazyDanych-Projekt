import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Login to Your Account</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email"
                 placeholder="you@example.com"
                 required
                 className="border-violet-300 focus:border-violet-500 focus:ring-violet-500"/>
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            {/*<Link*/}
            {/*  className="text-xs text-foreground underline"*/}
            {/*  href="/forgot-password"*/}
            {/*>*/}
            {/*  Forgot Password?*/}
            {/*</Link>*/}
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="border-violet-300 focus:border-violet-500 focus:ring-violet-500"
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction} className="w-full bg-violet-600 hover:bg-violet-700 text-white">
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams}/>
        </div>
      </form>
  );
}
