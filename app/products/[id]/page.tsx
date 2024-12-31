import {ProductsList} from "@/components/products-list";
import {createClient} from "@/utils/supabase/server";


export default async function Product({
    params,
  }: {
  params: Promise<{ id: number }>
}) {
  const supabase = await createClient();
  const id = (await params).id??1
  const { data: products } = await supabase.from("all_products_in_category_view").select()
    .filter("category_id", "eq", id>0?id:1)
    .filter("available", "eq", true)
  return (
    <ProductsList data={products??[]}/>
  );
}
