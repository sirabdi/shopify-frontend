import { cookies } from "next/headers";
import { AUTH_COOKIES } from "./auth-cookies";

export default function authenticated() {
  return !!cookies().get(AUTH_COOKIES);
}
