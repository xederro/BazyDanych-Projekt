import {createClient} from "@/utils/supabase/server";
import {OrderDetails} from "@/components/order-details";
import {OrderDetailsMagazynier} from "@/components/order-details-magazynier";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";

export default async function OrdersDetails({
                                              params,
                                            }: {
  params: Promise<{ id: number }>
}) {
  const supabase = await createClient();
  const id = (await params).id??1
  let cookieStore = await cookies();
  const role = cookieStore.get('role')

  if (role?.value=='magazynier') {
    const { data: products } = await supabase.from("magazynier_order_view").select().eq('order_id', id)
    const { data: order } = await supabase.from("orders").select().eq('order_id', id).single()

    if (!order) {
      return notFound()
    }
    return (
      <OrderDetailsMagazynier order={order} products={products}/>
    );
  } else {
    const { data: order } = await supabase.from("klient_all_orders_view").select().eq('order_id', id).single()

    if (!order) {
      return notFound()
    }
    return (
      <OrderDetails order={order}/>
    );
  }
}
