"use server";
import { cookies } from "next/headers";
import { JSON_HEADER } from "../constants/api.constant";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export async function fetchWishlist() {
  try {
    revalidatePath("/wishlist");
    const locale = cookies().get("NEXT_LOCALE")?.value || "ar";
    const token =
      cookies().get("next-auth.session-token")?.value ||
      cookies().get("__Secure-next-auth.session-token")?.value;

    if (!token) {
      console.error("No session token found.");
      return null;
    }

    const response = await fetch(`${BASE_URL}/wishlist/get`, {
      method: "GET",
      cache: "no-store",
      headers: {
        lang: locale,
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const payload = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
