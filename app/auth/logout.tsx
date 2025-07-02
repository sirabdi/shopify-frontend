"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIES } from "./auth-cookies";
import { redirect } from "next/navigation";

export default async function logout() {
  cookies().delete(AUTH_COOKIES);
  redirect("/auth/login");
}
