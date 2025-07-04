"use server";

import { post } from "@/app/common/util/fetch";
import { revalidateTag } from "next/cache";

export default async function createProduct(formData: FormData) {
  const resonse = await post("products", formData);
  revalidateTag("product");
  return resonse;
}
