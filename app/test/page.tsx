import { createClient } from '@/utils/supabase/server';

export default async function Countries() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("all_products_in_category_view").select();

  return <pre>{JSON.stringify(products, null, 2)}</pre>
}