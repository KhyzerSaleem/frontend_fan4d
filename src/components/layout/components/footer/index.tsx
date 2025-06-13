import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

interface PayloadItem {
	key: string;
	value: string;
}

interface Payload {
	data: PayloadItem[];
}

const Footer = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/app/settings`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload: Payload = await response.json();

	// Extracting data from the payload
	const siteNameAr = payload?.data?.find((item) => item.key === "site_name_ar")?.value;
	const siteNameEn = payload?.data?.find((item) => item.key === "site_name_en")?.value;
	const phone = payload?.data?.find((item) => item.key === "phone")?.value;
	const email = payload?.data?.find((item) => item.key === "email")?.value;
	const addressAr = payload?.data?.find((item) => item.key === "address_ar")?.value;
	const addressEn = payload?.data?.find((item) => item.key === "address_en")?.value;
	const facebook = payload?.data?.find((item) => item?.key === "facebook")?.value;
	const twitter = payload?.data?.find((item) => item?.key === "twitter")?.value;
	const instagram = payload?.data?.find((item) => item.key === "instagram")?.value;
	// const logoUrl = payload.data.find((item) => item.key === "logo")?.value;

	return (
		<section className="md:mt-[100px] md:py-[32px] bg-normal p-[30px]">
			<div className="container mx-auto">
				<div className="row justify-between mb-[32px]">
					{/* left */}
					<div className="md:w-4/12 mb-4 md:mb-0">
						<div className="flex flex-col gap-y-[24px]">
							<img src="/assets/icons/logowhite.svg" width={154} height={40} alt="icon" />
							<p className="text-[0.8rem] text-white font-normal leading-[28px]">
								{siteNameAr} - {t("footer.description")}
							</p>
						</div>
					</div>

					{/* center */}
					<div className="md:w-3/12 flex flex-col items-start justify-center gap-y-[20px] mb-4 md:mb-0">
						<div className="location flex items-start gap-x-[6px]">
							<img src="/assets/icons/location.svg" alt="icon" />
							<div>
								<p className="text-white text-[0.8rem] font-[700] leading-[20px]"> {t("footer.address")} </p>
								<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={""}>
									{locale === "ar" ? addressAr : addressEn}
								</Link>
							</div>
						</div>
						<div className="phone flex items-start gap-x-[6px]">
							<img src="/assets/icons/call.svg" alt="icon" />
							<div>
								<p className="text-white text-[0.8rem] font-[700] leading-[20px]"> {t("footer.phone")} </p>
								<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={`tel:${phone}`}>
									{phone}
								</Link>
							</div>
						</div>
						<div className="email flex items-start gap-x-[6px]">
							<img src="/assets/icons/sms.svg" alt="icon" />
							<div>
								<p className="text-white text-[0.8rem] font-[700] leading-[20px]"> {t("footer.email")} </p>
								<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={`mailto:${email}`}>
									{email}
								</Link>
							</div>
						</div>
					</div>

					{/* right */}
					<div className="md:w-3/12 flex flex-col items-start justify-center gap-y-[20px]">
						<div className="flex items-center gap-x-[6px]">
							<img src="/assets/icons/stickynote.svg" alt="icon" />
							<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={"/about-us"}>
								{t("footer.about")}
							</Link>
						</div>
						<div className="flex items-center gap-x-[6px]">
							<img src="/assets/icons/verify.svg" alt="icon" />
							<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={"/terms-and-conditions"}>
								{t("footer.terms")}
							</Link>
						</div>
						<div className="flex items-center gap-x-[6px]">
							<img src="/assets/icons/security-user.svg" alt="icon" />
							<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={"/privacy-policy"}>
								{t("footer.privacy")}
							</Link>
						</div>
						<div className="flex items-center gap-x-[6px]">
							<img src="/assets/icons/messages.svg" alt="icon" />
							<Link className="text-white text-[0.8rem] font-[400] leading-[20px]" href={"/contact-us"}>
								{t("footer.contact")}
							</Link>
						</div>
					</div>
				</div>
				<div className="row justify-between border-t border-white]">
					<div className="mt-[32px]">
						<p className="text-white text-[0.8rem] font-[400] leading-[20px]">
							{t("footer.copyright", {
								siteName: locale === "ar" ? siteNameAr : siteNameEn,
							})}
						</p>
					</div>
					<div className="flex items-center gap-x-[10px] mt-[32px]">
						{facebook && (
							<Link href={facebook}>
								{" "}
								<img src="/assets/icons/Facebook.svg" alt="icon" />{" "}
							</Link>
						)}
						{instagram && (
							<Link href={instagram}>
								{" "}
								<img src="/assets/icons/Instagram.svg" alt="icon" />{" "}
							</Link>
						)}
						{twitter && (
							<Link href={twitter}>
								{" "}
								<img src="/assets/icons/Xtwiter.svg" alt="icon" />{" "}
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
