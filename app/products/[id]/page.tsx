import {ProductsList} from "@/components/products-list";
import {createClient} from "@/utils/supabase/server";


export default async function Product({
    params,
  }: {
  params: Promise<{ id: number }>
}) {
  const supabase = await createClient();
  const id = (await params).id??0
  let query = supabase.from("all_products_in_category_view").select().filter("available", "eq", true);

  if (id > 0) {
    query = query.filter("category_id", "eq", id);
  }

  const { data: products } = await query;
  return (
    <ProductsList data={products??[]}/>
  );
}