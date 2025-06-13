"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationLinks() {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const links = [
    {
      href: "/settings/profile-my-info",
      icon: "/assets/icons/my-data.svg",
      label: t("my-data"),
    },
    {
      href: "/settings/profile-locations",
      icon: "/assets/icons/location2.svg",
      label: t("my-addresses"),
    },
    {
      href: "/settings/my-orders",
      icon: "/assets/icons/my-requests.svg",
      label: t("my-orders"),
    },
    {
      href: "/settings/my-designs",
      icon: "/assets/icons/my-designs.svg",
      label: t("special-pricing"),
    },
    {
      href: "/settings/payment",
      icon: "/assets/icons/card-pos.svg",
      label: t("my-wallet"),
    },
  ];

  return (
    <div className="p-4 border border-text-borders block md:flex items-center rounded-sm mb-6">
      {links.map((item) => {
        const isActive = pathname.includes(item.href);

        return (
          <div key={item.href} className="flex-1">
            <Link
              href={`${item.href}?${searchParams.toString()}`}
              locale={locale !== "ar" ? "ar" : "en"}
              className="flex items-center gap-2 justify-center md:justify-start py-2 md:py-0"
            >
              <img src={item.icon} alt={item.label} />
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
