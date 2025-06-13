"use client";
import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

const AuthHeader = () => {
	const t = useTranslations();
	const locale = useLocale();

	// Navgation

	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<section className="header ">
			{/* Header Top */}
			<div className="Header_Top  px-[1rem] lg:px-[5rem] py-[0.8rem] bg-white flex justify-between items-center shadow-md  sticky top-0 left-0 right-0 z-[100]">
				<div className="">
					<Link href={"/"}>
						<Image src={"/assets/images/Logo.png"} alt="logo" width={93} height={24} className="object-cover" />
					</Link>
				</div>
				<div className="flex items-center gap-x-[0.8rem] ">
					<img src="/assets/icons/languageSquare.svg" alt="icon" />
					<Link href={`${pathname}?${searchParams.toString()}`} locale={locale !== "ar" ? "ar" : "en"} className="text-[0.8rem] sm:text-[1rem] font-normal text-normal">
						{t("language")}
					</Link>
				</div>
			</div>
		</section>
	);
};

export default AuthHeader;
