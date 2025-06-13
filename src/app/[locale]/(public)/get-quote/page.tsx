import React from 'react'
import ContactForm from './_components/contact-form'
import Breadcrumbs from '@/components/common/bread-crumb';
import { getTranslations } from 'next-intl/server';

const Page = async () => {

  const t = await getTranslations()

  const breadcrumbItems = [
    {
      href: "/",
      // label: "الرئيسية",
      icon: "/assets/icons/home.svg",
    },
    {

      label: t("Get-quote"),
    },
  ];

  return (
    <>

      <Breadcrumbs items={breadcrumbItems} />
      <section className='section' >

        <div className="container mx-auto mb-6 ">
          <div className="row  ">

            <div className="col-span-full mb-12">
              <span className="span_section"> { t("Accurate-pricing") } </span>
              <div className="flex items-center">
                <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                <h2 className="py-[16px] h2_section">
                  { t("Get-perfect") }
                </h2>
              </div>
              {/* <p className="p_section pt-[12px]">
                نوفر لك خدمة تقدير تكلفة طباعة وتصميم المنتجات بدقة وسرعة. أدخل تفاصيل طلبك، واحصل على تسعيرة تناسب ميزانيتك وخططك، لنحقق رؤيتك بأفضل جودة ممكنة.
              </p> */}
            </div>

            <div className="w-full mb-6 md:mb-0 ">
              <h2 className='text-[20px] font-bold text-text-main mb-[12px] ' > { t("Order-data") } </h2>
              <ContactForm />
            </div>

          </div>


        </div>

      </section>


    </>
  )
}

export default Page