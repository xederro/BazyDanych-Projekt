import {ProductDetails} from "@/components/product-details";
import {ProductDetailsKierownik} from "@/components/product-details-kierownik";
import {ProductDetailsMagazynier} from "@/components/product-details-magazynier";
import {createClient} from "@/utils/supabase/server";
import {notFound} from "next/navigation";
import {cookies} from "next/headers";

export default async function Product({
                                        params,
                                      }: {
  params: Promise<{ id: number }>
}) {
  const cookieStore = await cookies()
  const role = cookieStore.get('role')
  const supabase = await createClient();
  const id = (await params).id??1
  const { data: products } = await supabase.from("products").select().filter("product_id", "eq", id>0?id:1).maybeSingle()

  if (!products) {
    return notFound();
  }

  if (role?.value=='magazynier') {
    const { data: units } = await supabase.from("units").select().filter("product_id", "eq", products.product_id)
    return (
      <ProductDetailsMagazynier product={products} units={units??[]}/>
    );
  } else if (role?.value=='kierownik') {
    return (
      <ProductDetailsKierownik product={products}/>
    );
  } else {
    return (
      <ProductDetails product={products}/>
    );
  }
}
