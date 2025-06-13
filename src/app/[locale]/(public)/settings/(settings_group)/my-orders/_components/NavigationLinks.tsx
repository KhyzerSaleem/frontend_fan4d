"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";



export default function NavigationLinks() {

  const t = useTranslations()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const links = [
    {
      href: "/settings/my-orders/current",
      label: t("current_orders"),
    },
    {
      href: "/settings/my-orders/previous",
      label: t("previous_orders"),
    },
  ];

  return (
    <div className="flex gap-x-[24px] my-[32px]">
      {links.map((item) => {
        const isActive = pathname.includes(item.href);

        return (
          <div key={item.href} className="flex items-center ">
            <Link
              href={`${item.href}?${searchParams.toString()}`}
              locale={locale !== "ar" ? "ar" : "en"}
              className="flex py-2 md:py-0"
            >
              <span
                className={`text-lg font-normal transition-colors ${
                  isActive ? "text-normal font-semibold" : "text-text-main"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
