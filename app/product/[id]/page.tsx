import {randomInt} from "node:crypto";
import {ProductDetails} from "@/components/product-details";
import {ProductDetailsKierownik} from "@/components/product-details-kierownik";
import {ProductDetailsMagazynier} from "@/components/product-details-magazynier";
import {createClient} from "@/utils/supabase/server";
import {notFound} from "next/navigation";

export default async function Product({
                                        params,
                                      }: {
  params: Promise<{ id: number }>
}) {
  const supabase = await createClient();
  const id = (await params).id??1
  const { data: products } = await supabase.from("products").select().filter("product_id", "eq", id>0?id:1).maybeSingle()

  if (!products) {
    return notFound();
  }

  if (randomInt(0,3)==0) {
    return (
      <ProductDetails product={products}/>
    );
  } else if (randomInt(0,2)==0) {
    const { data: units } = await supabase.from("units").select().filter("product_id", "eq", products.product_id)
    return (
      <ProductDetailsMagazynier product={products} units={units??[]}/>
    );
  } else {
    return (
      <ProductDetailsKierownik product={products}/>
    );
  }
}
