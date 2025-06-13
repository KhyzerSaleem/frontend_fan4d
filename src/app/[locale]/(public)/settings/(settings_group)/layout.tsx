import { Locale } from "@/i18n/routing";
import NavigationLinks from "./_components/NavigationLinks";
import { getTranslations } from "next-intl/server";
export const dynamic = "force-dynamic";

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: { locale: Locale };
};

export default async function RootLayout({ children, params: { locale } }: LocaleLayoutProps) {
	const t = await getTranslations({ locale });

	return (
		<>
			<main>
				<section className="section">
					<div className="container mx-auto">
						<div className="col-span-full mb-12">
							<span className="span_section"> {t("information-safe")} </span>
							<div className="flex items-center">
								<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
								<h2 className="py-[16px] h2_section">{t("view-update")}</h2>
							</div>
							<p className="p_section pt-[12px]">{t("find-information")}</p>
						</div>

						{/*  NavigationLinks  */}
						<NavigationLinks />

						{children}
					</div>
				</section>
			</main>
		</>
	);
}
