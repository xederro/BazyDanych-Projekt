import { CreateOrder } from "@/components/create-order";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";

export default async function OrderCreate() {
  let cookieStore = await cookies();
  const role = cookieStore.get('role')

  if (role?.value=='sprzedawca') {
    return (
      <CreateOrder/>
    );
  } else {
    return notFound()
  }
}
