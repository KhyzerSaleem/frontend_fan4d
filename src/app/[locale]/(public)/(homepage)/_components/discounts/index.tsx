import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import React from "react";

const Discounts = async () => {
  const t = await getTranslations();

  return (
    <>
      <section className="section">
        <div className="container mx-auto">
          <div className="row">
            {/* صورة الخصومات */}
            <div className="w-full md:w-6/12">
              <div>
                <img
                  src="/assets/images/Discounts1.png"
                  alt="Discounts Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* تفاصيل الخصومات */}
            <div className="w-full md:w-6/12 pt-6 md:pt-0">
              <div className="col-span-full mb-12 md:ps-[32px]">
                <span className="span_section">{t("discounts.printing-title")}</span>
                <div className="flex items-center">
                  <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                  <h2 className="py-[16px] h2_section">
                    {t("discounts.printing-discount")}
                  </h2>
                </div>
                <p className="p_section pt-[12px]">
                  {t("discounts.printing-description")}
                </p>

                <Button variant={"transparent"} className="md:w-1/2 w-full mt-[32px]">
                  <Link href="/categories/all-products">
                    {t("discounts.take-offer")}
                  </Link>
                </Button>
              </div>
            </div>

            {/* تفاصيل تصميم العبوات */}
            <div className="w-full md:w-6/12">
              <div>
                <div className="col-span-full mb-12">
                  <span className="span_section">{t("discounts.packaging-title")}</span>
                  <div className="flex items-center">
                    <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                    <h2 className="py-[16px] h2_section">
                      {t("discounts.packaging-discount")}
                    </h2>
                  </div>
                  <p className="p_section pt-[12px]">
                    {t("discounts.packaging-description")}
                  </p>

                  <Button variant={"transparent"} className="md:w-1/2 w-full mt-[32px]">
                    <Link href="/categories/all-products">
                      {t("discounts.get-design")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* صورة تصميم العبوات */}
            <div className="w-full md:w-6/12">
              <img
                src="/assets/images/Discounts2.png"
                alt="Packaging Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Discounts;
