import { ReportDashboard } from "@/components/report-dashboard";
import {createClient} from "@/utils/supabase/server";

export default async function Raport() {
  const supabase = await createClient();
  const { data: report } = await supabase.from("kierownik_raport_view").select()
  const { data: in_stock } = await supabase.from("products").select("product_id, name, stock, reserved").gt("stock", 0)

  return (
    <ReportDashboard report={report} in_stock={in_stock??[]}/>
  );
}
