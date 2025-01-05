import {randomInt} from "node:crypto";
import {Orders} from "@/components/orders";
import {OrdersSeller} from "@/components/orders-seller";
import {createClient} from "@/utils/supabase/server";

export default async function Order() {
  const supabase = await createClient();
  if (randomInt(0,2)==0) {
    const { data: orders } = await supabase.from("orders").select()
    return (
      <Orders ordersList={orders??[]}/>
    );
  } else {
    const { data: orders } = await supabase.from("sprzedawca_orders_view").select()
    return (
      <OrdersSeller ordersList={orders??[]}/>
    );
  }
}
