import React from "react";
import ContactForm from "./_components/contact-form";
import Breadcrumbs from "@/components/common/bread-crumb";
import Link from "next/link";
import GoogleMaps from "./_components/google-maps";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations();

  const breadcrumbItems = [
    {
      href: "/",
      // label: "الرئيسية",
      icon: "/assets/icons/home.svg",
    },
    {
      label: t("contact_us"),
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <section className="section">
        <div className="container mx-auto mb-6 ">
          <div className="row  justify-center ">
            <div className="col-span-full mb-12">
              <span className="span_section">{t("we_are_here")}</span>
              <div className="flex items-center">
                <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                <h2 className="py-[16px] h2_section">{t("call_us_anytime")}</h2>
              </div>
              <p className="p_section pt-[12px]">{t("support_message")}</p>
            </div>

            <div className="md:w-8/12 mb-6 md:mb-0 ">
              <h2 className="text-[20px] font-bold text-text-main mb-[12px] ">
                {" "}
                {t("message_info")}
              </h2>
              <ContactForm />
            </div>

            <div className="md:w-4/12">
              <div className="md:px-[27px] flex flex-col items-center justify-center  gap-y-[20px]">
                <div className="flex flex-col items-center justify-center gap-y-[20px] border-b pb-4  w-full ">
                  <img src="/assets/icons/location1.svg" alt="icon" />
                  <Link
                    href={""}
                    className="text-[20px] text-text-main font-normal "
                  >
                    {" "}
                    {t("riyadh_saudi")}
                  </Link>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-[20px]  border-b pb-4  w-full ">
                  <img src="/assets/icons/Message.svg" alt="icon" />
                  <Link
                    href={""}
                    className="text-[20px] text-text-main font-normal text-center "
                  >
                    info@fann.com <br />
                    Help.fann@gmail.com
                  </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-[20px]  border-b pb-4  w-full ">
                  <img src="/assets/icons/Calling.svg" alt="icon" />
                  <Link
                    href={""}
                    className="text-[20px] text-text-main font-normal text-center  "
                  >
                    +966123456789 <br />
                    00966123456789
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GoogleMaps />
      </section>
    </>
  );
};

export default Page;
