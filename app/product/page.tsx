import {randomInt} from "node:crypto";
import {ProductDetails} from "@/components/product-details";
import {ProductDetailsKierownik} from "@/components/product-details-kierownik";
import {ProductDetailsMagazynier} from "@/components/product-details-magazynier";

export default async function Product() {
  if (randomInt(0,3)==0) {
    return (
      <ProductDetails/>
    );
  } else if (randomInt(0,2)==0) {
    return (
      <ProductDetailsMagazynier/>
    );
  } else {
    return (
      <ProductDetailsKierownik/>
    );
  }
}
