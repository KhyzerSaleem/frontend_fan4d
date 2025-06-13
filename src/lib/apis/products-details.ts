'use server';

import { decode } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export async function fetchProducts(id: string) {
  try {
    const locale = cookies().get('NEXT_LOCALE')?.value || "ar";
    const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;

    const token = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

   
    

    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        lang: locale,
        Accept: "application/json",
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


export async function addAndRemoveProducts(id: number) {
  try {
      revalidatePath("/wishlist"); // Ensure the page is updated each time it's visited
    const locale = cookies().get('NEXT_LOCALE')?.value || "ar";
    const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;

    const token = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

   
    const formData = new FormData();
    formData.append("product_id", id.toString());


    const response = await fetch(`${BASE_URL}/wishlist/add`, {
      method: "POST",
      cache: "no-store",
      headers: {
        lang: locale,
        Accept: "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
      body: formData, 

    });

    if (!response.ok) {
      const payload = await response.json();
      return payload;
    }

    const payload = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}