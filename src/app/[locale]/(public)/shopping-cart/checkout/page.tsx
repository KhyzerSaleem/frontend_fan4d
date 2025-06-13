import Breadcrumbs from "@/components/common/bread-crumb";
import React from "react";
import ContactForm from "./_components/contact-form";
// import TotalBasket from "./_components/total-basket";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getLocale, getTranslations } from "next-intl/server";
import { getCart } from "@/lib/apis/get-cart";

const Page = async () => {
	const t = await getTranslations();
	const cartData = await getCart();

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

	const breadcrumbItems = [
		{
			href: "/",
			// label: "الرئيسية",
			icon: "/assets/icons/home.svg",
		},
		{
			label: t("basket"),
		},
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto">
					<div className="col-span-full mb-12">
						<span className="span_section"> {t("Simple-steps")}</span>
						<div className="flex items-center">
							<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
							<h2 className="py-[16px] h2_section">{t("fast-payment-options")}</h2>
						</div>
						{/* <p className="p_section pt-[12px]">
              صفحة الدفع تضمن لك تجربة سلسة لتأكيد طلبك واختيار طريقة الدفع
              المفضلة. نقدّم خيارات دفع متعددة وآمنة لضمان راحتك، مع دعم كامل
              لتلبية جميع احتياجاتك بكل احترافية.
            </p> */}
					</div>
					<div className="flex flex-wrap items-center  ">
						<div className=" w-full">
							<div className=" md:px-6 flex flex-col gap-y-[12px] ">
								<ContactForm locations={locations} cartData={cartData?.data} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;
