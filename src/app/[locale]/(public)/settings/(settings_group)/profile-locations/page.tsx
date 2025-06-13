import React from "react";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { CardLocation } from "./_components/card-location";

const Page = async () => {
	const tokenCookie = cookies().get("next-auth.session-token")?.value || cookies().get("__Secure-next-auth.session-token")?.value;
	const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });
	const locale = await getLocale();

	// جلب البيانات من الـ API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
			Accept: "application/json",
			Authorization: `Bearer ${token?.token}`,
		},
	});

	const payload = await response.json();

	// التحقق من حالة الاستجابة
	const locations = payload?.data?.data || []; // تأكد من وجود بيانات المواقع في الاستجابة

	return (
		<>
			<div>
				<CardLocation locations={locations} />
			</div>
		</>
	);
};

export default Page;
