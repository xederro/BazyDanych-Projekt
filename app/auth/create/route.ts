import { adminAuthClient } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function POST(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  const supabase = await createClient();
  const { email, name, nip } = await request.json()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) { return NextResponse.json({ error: 'no session' }, { status: 400 }) }

  if (!email || !nip) { return NextResponse.json({ error: 'no email or nip' }, { status: 500 }) }

  const { data, error } = await adminAuthClient.createUser({ email, password:nip })

  if (error) { return NextResponse.json({ error }, { status: 500 }) }

  const {data: user, error:e} = await supabase.from('clients').insert([{name: name, nip: nip, auth_id: data.user?.id}]).select('client_id').single()

  if (e) {
    await adminAuthClient.deleteUser(data.user?.id)
    return NextResponse.json({ e }, { status: 500 })
  }

  return NextResponse.json({ user:user }, { status: 200 })
}