import {ProductsList} from "@/components/products-list";
import {createClient} from "@/utils/supabase/server";

export default async function AllProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("all_products_in_category_view").select()
      .filter("available", "eq", true);

  return (
      <ProductsList data={products ?? []} />
  );
}
