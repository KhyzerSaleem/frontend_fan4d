"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;
export const applyVoucher = async (values: { voucher_code: string; total: number }) => {
  const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
    const token = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
  
    // إنشاء بيانات الطلب وإضافة القيم المطلوبة
    const formData = new FormData();
    formData.append("voucher_code", values.voucher_code);
    formData.append("total", values.total.toString()); // تحويل `total` إلى نص لأنه رقم
  
    // إرسال الطلب
    const response = await fetch(`${BASE_URL}/orders/apply/voucher`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
  
    // قراءة البيانات من الاستجابة
    const payload = await response.json();
    
    // **التحقق مما إذا كان هناك خطأ في الاستجابة**
    if (!response.ok) {
      console.error("خطأ في الاستجابة من السيرفر:", payload); // طباعة الخطأ لفحصه
      throw new Error(JSON.stringify(payload)); // تأكد أن الخطأ يتم إلقاؤه كمحتوى JSON
    }
  
    return payload;
  };
  