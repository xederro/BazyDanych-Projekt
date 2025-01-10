import { adminAuthClient } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function POST(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  const supabase = await createClient();
  const { email, password } = await request.json()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) { return NextResponse.json({ error: 'no session' }, { status: 400 }) }

  if (!email || !password) { return NextResponse.json({ error: 'no email or password' }, { status: 500 }) }

  const { data, error } = await adminAuthClient.createUser({ email, password })

  if (error) { return NextResponse.json({ error }, { status: 500 }) }

  return NextResponse.json({ id:data.user?.id }, { status: 200 })
}