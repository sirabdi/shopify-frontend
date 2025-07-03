"use server";

import { FormResponse } from "@/app/common/interface/form-response.interface";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: FormResponse,
  formData: FormData
) {
  const { error } = await post("user", formData);
  if (error) {
    return { error };
  }
  redirect("/auth/login");
}
