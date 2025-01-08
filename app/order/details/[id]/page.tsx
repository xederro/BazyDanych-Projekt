import {createClient} from "@/utils/supabase/server";
import {OrderDetails} from "@/components/order-details";
import {OrderDetailsMagazynier} from "@/components/order-details-magazynier";
import {randomInt} from "node:crypto";

export default async function OrdersDetails({
                                              params,
                                            }: {
  params: Promise<{ id: number }>
}) {
  const supabase = await createClient();
  const id = (await params).id??1
  const { data: products } = await supabase.from("products").select().filter("product_id", "eq", id>0?id:1).maybeSingle()

  // if (!products) {
  //   return notFound();
  // }

  if (randomInt(0,2)==0) {
    return (
      <OrderDetails/>
    );
  } else {
    return (
      <OrderDetailsMagazynier/>
    );
  }
}
