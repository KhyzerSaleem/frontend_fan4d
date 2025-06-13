"use client"
import Breadcrumbs from "@/components/common/bread-crumb";
import React from "react";
import Crat from "./_components/cart";
// import TotalBasket from "./_components/total-basket";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/lib/apis/get-cart";

export default function  Page () {

  const t = useTranslations();

	const { data: payload } = useQuery({
		queryKey: ["cart"],
		queryFn: getCart,
	});
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
            <span className="span_section">
              {" "}
              { t("Complete-your-selections") }
            </span>
            <div className="flex items-center">
              <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
              <h2 className="py-[16px] h2_section">
                { t("Browse-your-products") }
              </h2>
            </div>
            {/* <p className="p_section pt-[12px]">
              صفحة السلة تتيح لك مراجعة المنتجات التي اخترتها، تعديل الكميات،
              وإضافة أي ملاحظات قبل إتمام الطلب. نضمن تجربة سلسة وسريعة للحصول
              على أفضل جودة تلبي تطلعاتك.
            </p> */}
          </div>
          <div className="flex flex-wrap items-start  ">
            <div className=" w-full">
              <div className="md:px-6 flex flex-col gap-y-[12px] ">
                <div className="px-[20px] py-[16px] border border-text-borders rounded-sm">
                  <h2 className="text-[18px] font-bold text-text-main ">
                    {" "}
                    { t("Products") } : {payload?.data?.items.length}
                  </h2>
                </div>
                <div className="">
                  <Crat
                    cart={payload?.data?.items}
                    total={payload?.data?.total}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


