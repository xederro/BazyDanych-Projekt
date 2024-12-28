import {OrderDetails} from "@/components/order-details";
import {OrderDetailsMagazynier} from "@/components/order-details-magazynier";
import {randomInt} from "node:crypto";

export default async function OrdersDetails() {
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
