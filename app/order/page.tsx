import {randomInt} from "node:crypto";
import {Orders} from "@/components/orders";
import {OrdersSeller} from "@/components/orders-seller";

export default async function OrderCreate() {
  if (randomInt(0,2)==0) {
    return (
      <Orders/>
    );
  } else {
    return (
      <OrdersSeller/>
    );
  }
}
