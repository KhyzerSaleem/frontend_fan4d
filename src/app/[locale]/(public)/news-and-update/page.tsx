import Breadcrumbs from '@/components/common/bread-crumb';
import Subscribe from '@/components/custom/subscribe';
import Link from 'next/link';
import React from 'react';

const Page = () => {
    const breadcrumbItems = [
        {
            href: "/",
            // label: "الرئيسية",
            icon: "/assets/icons/home.svg",
        },
        {
            label: " المقالات ",
        },
    ];

    const categories = [
        {
            id: 1,
            image: "/assets/images/categories.png",
            title: "لوحات الاكريليك",
            buttonText: "اختر الآن!",
            date: "ديسمبر",
            number: 21,
            description: "تعرف على أهمية تغليف المنتجات وكيفية تحسين تجربة العملاء عبر تصاميم إبداعية ومبتكرة تزيد من قيمة علامتك.",
        },
        {
            id: 2,
            image: "/assets/images/categories.png",
            title: "طباعة ثلاثية الأبعاد",
            buttonText: "اختر الآن!",
            date: "يناير",
            number: 15,
            description: "استكشف التقنيات الحديثة في الطباعة ثلاثية الأبعاد وكيف يمكن لتلك التقنيات أن تغير مجالات متعددة في التصنيع والتصميم.",
        },
        {
            id: 3,
            image: "/assets/images/categories.png",
            title: "التغليف المبتكر",
            buttonText: "اختر الآن!",
            date: "فبراير",
            number: 10,
            description: "تعرف على أحدث تقنيات التغليف المبتكر وكيف يمكن أن تساعد في تحسين تجربة العميل وتعزيز جاذبية المنتج.",
        },
        {
            id: 4,
            image: "/assets/images/categories.png",
            title: "تصاميم الجرافيك",
            buttonText: "اختر الآن!",
            date: "مارس",
            number: 5,
            description: "ابدأ في استكشاف فنون تصميم الجرافيك وكيف يمكن أن تساهم في تحسين هوية العلامة التجارية.",
        },
    ];
    

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="section">
                <div className="container mx-auto">
                    <div className="row justify-center ">
                        <div className="col-span-full mb-12">
                            <span className="span_section"> اكتشف أسرار الطباعة الحديثة </span>
                            <div className="flex items-center">
                                <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                                <h2 className="py-[16px] h2_section">
                                    أفضل المقالات لتطوير معرفتك بالطباعة
                                </h2>
                            </div>
                            <p className="p_section pt-[12px]">
                                استمتع بقراءة مقالات متخصصة في عالم الطباعة وتصميم العبوات. نقدم لك نصائح وأفكار مبتكرة لتطوير علامتك التجارية وتحقيق أقصى استفادة من خدماتنا.
                            </p>
                        </div>

                        {/* Dynamically render categories */}
                        {categories.map((category) => (
                            <div key={category.id} className="md:w-4/12 relative  ">
                                <div className="md:px-4 pb-[32px]  relative">
                                    <div className='relative' >
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full md:h-[400px] object-cover rounded-sm "
                                        />
                                        <div className=' absolute  bottom-[1rem] rtl:right-[1rem] ltr:left-[1rem]  px-[13.759px] py-[6.35px] bg-white flex flex-col items-center justify-center  rounded-sm ' >
                                            <span className=' text-text-main text-[1.2rem] font-bold ' > {category.number} </span>
                                            <span className='text-text-sub text-[12px] font-normal ' > {category.date} </span>
                                        </div>
                                    </div>
                                    <div className='px-[1.3rem] py-[1.2rem] ' >
                                        <h2 className="text-text-main text-[1.2rem] font-bold ">
                                            {category.title}
                                        </h2>
                                        <p className='text-text-main text-[1rem] font-normal pt-[8px] pb-[21px] ' > {category.description} </p>
                                        <Link href={''} className=' text-customPalette-300 text-[1rem] font-normal flex items-center gap-x-[12px] '  >
                                            <span>اقرأ المزيد</span>
                                            <img src="/assets/icons/arrow-left.svg" className='ltr:rotate-180' alt="icon" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>
            <Subscribe
                spanText='ابقَ على اطلاع بآخر الأخبار'
                title=" اشترك لتصلك آخر التحديثات والأخبار "
                subtitle="اشترك الآن لتصلك أحدث المقالات والنصائح في عالم الطباعة والتصميم. كن أول من يطلع على عروضنا الحصرية وأفكارنا الإبداعية."
                placeholder="بريدك الإلكتروني"
                buttonText="اشتراك"
            />

        </>
    );
};

export default Page;
