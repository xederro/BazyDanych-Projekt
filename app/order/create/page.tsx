import { CreateOrder } from "@/components/create-order";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
// import {createClient} from "@/utils/supabase/server";

export default async function OrderCreate() {
  let cookieStore = await cookies();
  const role = cookieStore.get('role')

  if (role?.value=='sprzedawca') {
    // let supabase = await createClient();
    // const { data: clients } = await supabase.from("clients").select()
    // const { data: clients } = await supabase.from("clients").select()
    return (
      <CreateOrder/>
    );
  } else {
    return notFound()
  }
}
