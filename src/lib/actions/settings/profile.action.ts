'use server';

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export const profileAction = async (formData: FormData) => {

   

    const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
    const token = await decode( { token: tokenCookie , secret: process.env.NEXTAUTH_SECRET! } )

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/profile/update', {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json" , 
            Authorization: `Bearer ${token?.token}`,
        }
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    return payload;
};


export const deleteAccountAction = async () => {



    const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
    const token = await decode( { token: tokenCookie , secret: process.env.NEXTAUTH_SECRET! } )

  

    // إرسال الطلب
    const response = await fetch(BASE_URL + '/auth/delete-account', {
        headers: {
            ...JSON_HEADER , 
            Authorization: `Bearer ${token?.token}`,
        }
    });

    // قراءة البيانات من الاستجابة
    const payload = await response.json();

    return payload;
};