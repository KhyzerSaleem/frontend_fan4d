import React from 'react';
import InnovativeIdeas from './_components/Innovative-ideas';
import Subscribe from '@/components/custom/subscribe';

const Page = () => {
    // البيانات الديناميكية
    const article = {
        title: "فن تغليف المنتجات",
        publishedDate: "2024-12-29",
        description:
            "التغليف ليس مجرد غلاف خارجي للمنتج، بل هو أداة تسويقية قوية تساهم في جذب انتباه العملاء وإبراز هوية العلامة التجارية. يمكن للتغليف المميز أن يكون العامل الفاصل في قرار الشراء، حيث يعكس جودة المنتج ويخلق تجربة إيجابية تعزز ولاء العملاء.",
        sections: [
            {
                title: "أهمية التغليف في تسويق المنتجات",
                subsections: [
                    {
                        subtitle: "1. إبراز هوية العلامة التجارية",
                        content:
                            "يعتبر التغليف جزءًا لا يتجزأ من الهوية البصرية للعلامة التجارية. باستخدام الألوان والشعارات المناسبة، يمكنك ترك انطباع دائم في ذهن العميل وربط منتجك بجودة وتميز علامتك التجارية.",
                    },
                    {
                        subtitle: "2. تعزيز تجربة العميل",
                        content:
                            "التغليف يساهم في تحسين تجربة العميل من خلال تصميم جذاب يعكس اهتمامك بجودة المنتج وتجربة المستخدم. يمكن للتغليف المميز أن يجعل العميل يشعر بأن المنتج يستحق الاستثمار.",
                    },
                ],
            },
            {
                title: "التغليف كمجال للإبداع",
                subsections: [
                    {
                        subtitle: "1. تصاميم مبتكرة وجذابة",
                        content:
                            "من خلال التصاميم الفريدة، يمكن للمنتجات أن تبرز في السوق المزدحم. الابتكار في تصميم التغليف يعكس تفرد المنتج ويساهم في جذب الانتباه.",
                    },
                    {
                        subtitle: "2. التغليف القابل لإعادة التدوير",
                        content:
                            "تزايد الاهتمام بالتغليف المستدام هو توجه عالمي. التغليف القابل لإعادة التدوير يساعد في تقليل الأثر البيئي ويعكس التزام العلامة التجارية بالاستدامة.",
                    },
                ],
            },

            {
                title: "التغليف كمجال للإبداع",
                subsections: [
                    {
                        subtitle: "1. تصاميم مبتكرة وجذابة",
                        content:
                            "من خلال التصاميم الفريدة، يمكن للمنتجات أن تبرز في السوق المزدحم. الابتكار في تصميم التغليف يعكس تفرد المنتج ويساهم في جذب الانتباه.",
                    },
                    {
                        subtitle: "2. التغليف القابل لإعادة التدوير",
                        content:
                            "تزايد الاهتمام بالتغليف المستدام هو توجه عالمي. التغليف القابل لإعادة التدوير يساعد في تقليل الأثر البيئي ويعكس التزام العلامة التجارية بالاستدامة.",
                    },
                ],
            },
        ],
    };

    return (
        <>
            <section>
                <div className="container mx-auto ">
                    <div className="row justify-center ">
                        <div className=' relative ' >
                            <img
                                src="/assets/images/newsid.png"
                                alt="image"
                                className="object-cover w-full h-[630px] rounded-b-md"
                            />
                        </div>
                        <div className=" w-11/12 md:w-10/12 relative top-[50%] transform translate-y-[-10%]   ">
                            <div className="bg-white p-[2rem] rounded-md shadow-md  ">
                                {/* section header */}
                                <div className="flex flex-col gap-y-[32px]">
                                    <h2 className=" text-[25px] md:text-[36px] font-[600] text-text-main">
                                        {article.title}
                                    </h2>
                                    <p className=" text-[16px]  md:text-[20px] font-[400] text-text-sub">
                                        تم النشر في {article.publishedDate}
                                    </p>
                                </div>
                                {/* section info */}
                                <div>
                                    <div className="flex flex-col gap-y-[32px] py-[32px]">
                                        <h2 className="text-text-main font-normal text-[1rem] md:text-[1.2rem]">
                                            {article.description}
                                        </h2>
                                    </div>

                                    {/* section info important */}
                                    {article.sections.map((section, index) => (
                                        <div key={index}>
                                            <h2 className="text-text-main font-bold text-[1.1rem] md:text-[1.5rem]">
                                                {section.title}
                                            </h2>

                                            <div className="flex flex-col gap-y-[32px] py-[32px]">
                                                {section.subsections.map((subsection, idx) => (
                                                    <div key={idx}>
                                                        <h2 className="text-text-main font-bold text-[1rem] md:text-[1.3rem]">
                                                            {subsection.subtitle}
                                                        </h2>
                                                        <p className=' text-[14px] ' >{subsection.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <InnovativeIdeas />
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
