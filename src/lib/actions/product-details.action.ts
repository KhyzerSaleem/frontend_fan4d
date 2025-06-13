'use server';

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export const ProductDetailsAction = async (formData: FormData) => {

   
    

    const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
    const token = await decode( { token: tokenCookie , secret: process.env.NEXTAUTH_SECRET! } )

  

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/products/calculate/price', {
        method: "POST",
        body: formData,
        headers: {
            ...JSON_HEADER , 
            Authorization: `Bearer ${token?.token}`,
        }
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();
  
    
    return payload;
};