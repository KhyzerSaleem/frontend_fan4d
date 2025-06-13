
import { decode } from "next-auth/jwt";
import { JSON_HEADER } from "../constants/api.constant";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export async function fetchPointsTransactions() {
  try {
    const locale = cookies().get('NEXT_LOCALE')?.value || "ar";
    const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
    const token = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    

    const response = await fetch(`${BASE_URL}/points/transactions`, {
      method: "GET",
      cache: "no-store",
      headers: {
        lang: locale,
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const payload = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

