import {Orders} from "@/components/orders";
import {OrdersSeller} from "@/components/orders-seller";
import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";

export default async function Order() {
  const supabase = await createClient();

  let cookieStore = await cookies();
  const role = cookieStore.get('role')

  if (role?.value=='sprzedawca') {
    const { data: orders } = await supabase.from("sprzedawca_orders_view").select()
    return (
      <OrdersSeller ordersList={orders??[]}/>
    );
  } else if (role?.value=='kierownik') {
    const { data: orders } = await supabase.from("orders").select()
    return (
      <Orders ordersList={orders??[]}/>
    );
  } else if (role?.value=='magazynier') {
    const { data: orders } = await supabase.from("orders").select().in('status', ['submitted', 'processed'])
    return (
      <Orders ordersList={orders??[]}/>
    );
  } else {
    const { data: orders } = await supabase.from("orders").select()
    return (
      <Orders ordersList={orders??[]}/>
    );
  }
}
