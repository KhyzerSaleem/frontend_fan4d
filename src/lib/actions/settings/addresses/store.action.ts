"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API;

export const storeAction = async (fields: storeFields) => {
  

  const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

      // إنشاء كائن FormData
      const formData = new FormData();
      Object.keys(fields).forEach(key => {
        const value = fields[key as keyof storeFields];
        if (value !== undefined && value !== null) {  // التأكد من عدم وجود undefined أو null
            formData.append(key, String(value)); // تحويل أي قيمة إلى string لضمان التوافق
        }
    });

  // إرسال الطلب
  const response = await fetch(BASE_URL + "/addresses/store", {
    method: "POST",
    body: formData,
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.token}`,
    },
  });

  // قراءة البيانات من الاستجابة
  const payload = await response.json();

  return payload;
};


export const deleteLocationAction = async (id: number) => {
  

  const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
  const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

  // إنشاء FormData وإضافة الـ id
  const formData = new FormData();
  formData.append('id', id.toString()); // تحويل id إلى string لأنه يتم إرسالها في FormData

  // إرسال الطلب
  const response = await fetch(BASE_URL + '/addresses/delete', {
    method: 'POST', // أو الطريقة المناسبة التي تستخدمها
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
    body: formData,
  });

  // قراءة البيانات من الاستجابة
  const payload = await response.json();

  return payload;
};


export const storeUpdataAction = async (fields: storeFields, selectedLocationId: string | number | null) => {
  

  const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
  const token = await decode({
    token: tokenCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // إنشاء كائن FormData
  const formData = new FormData();
  Object.keys(fields).forEach(key => {
    const value = fields[key as keyof storeFields];
    if (value !== undefined && value !== null) {
      formData.append(key, String(value)); // تحويل أي قيمة إلى string لضمان التوافق
    }
  });

  // إضافة selectedLocationId إلى الـ FormData
  if (selectedLocationId !== null && selectedLocationId !== undefined) {
    formData.append("id", String(selectedLocationId));
  }

  // إرسال الطلب
  const response = await fetch(BASE_URL + "/addresses/update", {
    method: "POST",
    body: formData,
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.token}`,
    },
  });

  // قراءة البيانات من الاستجابة
  const payload = await response.json();

  return payload;
};
