"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;



export const placeOrder = async (values: PlaceOrderType) => {
 

  const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // تحويل البيانات إلى FormData
  const formData = new FormData();
  formData.append("address_id", values.address_id);
  formData.append("payment_method", values.payment_method);
  formData.append("notes", values.notes ?? "" );

  if (values.voucher_code) {
    formData.append("voucher_code", values.voucher_code);
  }

  const response = await fetch(`${BASE_URL}/orders/place`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });

  const payload = await response.json();


  if (!response.ok) {
    console.error("خطأ في الاستجابة من السيرفر:", payload);
    throw new Error(JSON.stringify(payload));
  }

  return payload;
};
