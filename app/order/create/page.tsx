import { CreateOrder } from "@/components/create-order";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {createClient} from "@/utils/supabase/server";

export default async function OrderCreate() {
  let cookieStore = await cookies();
  const role = cookieStore.get('role')

  if (role?.value=='sprzedawca') {
    let supabase = await createClient();
    const { data: clients } = await supabase.from("clients").select("client_id, name, nip")
    const { data: products } = await supabase.from("products").select("product_id, name, price, stock, reserved").eq("available", true)
    if (!clients||!products) {
      return notFound()
    }

    return (
      <CreateOrder clients={clients} productsList={products}/>
    );
  } else {
    return notFound()
  }
}
