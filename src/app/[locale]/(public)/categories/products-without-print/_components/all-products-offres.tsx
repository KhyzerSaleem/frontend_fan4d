import { Button } from '@/components/ui/button';
import React from 'react';

const ALLProductsOffres = () => {

    const categories = [
        {
            id: 1,
            image: "/assets/images/categories.png",
            title: "طباعة عالية الجودة",
            description: "استمتع بخدمات الطباعة باستخدام أحدث التقنيات لتقديم نتائج رائعة وألوان دقيقة. سواء كانت طباعة على الورق أو مواد أخرى، نحن نضمن لك نتائج احترافية تتجاوز توقعاتك.",
            buttonText: "اختر الآن!",
        },
        {
            id: 2,
            image: "/assets/images/categories.png",
            title: "طباعة عالية الجودة",
            description: "استمتع بخدمات الطباعة باستخدام أحدث التقنيات لتقديم نتائج رائعة وألوان دقيقة. سواء كانت طباعة على الورق أو مواد أخرى، نحن نضمن لك نتائج احترافية تتجاوز توقعاتك.",
            buttonText: "اختر الآن!",
        },

    ];

    return (
        <>
            <section className="section">
                <div className="container mx-auto">
                    <div className="row justify-center ">
                        <div className="col-span-full mb-12">
                            <span className="span_section"> اكتشف العروض المميزة الآن </span>
                            <div className="flex items-center">
                                <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                                <h2 className="py-[16px] h2_section">
                                    أفضل العروض بانتظارك
                                </h2>
                            </div>
                            <p className="p_section pt-[12px]">
                                في فن، نقدم لك مجموعة من العروض الحصرية التي تتناسب مع احتياجاتك، سواء كنت بحاجة إلى طباعة عالية الجودة أو تغليف مبتكر. استمتع بأفضل الأسعار والخدمات المتكاملة التي تضمن لك تجربة مثالية في كل مرحلة. لا تفوت هذه الفرص المميزة!
                            </p>
                        </div>

                        {/* Dynamically render categories */}
                        {categories.map((category) => (
                            <div key={category.id} className="md:w-6/12 relative  ">
                                <div className="md:px-4 pb-[32px] block md:flex items-center gap-x-[2rem] relative">
                                    <div className='md:w-1/2' >
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full md:h-[296px] object-cover rounded-sm "
                                        />
                                    </div>
                                    <div className='md:w-1/2' >
                                        <h2 className="text-text-main text-[1.2rem] pt-5 md:pt-0 font-bold ">
                                            {category.title}
                                        </h2>
                                        <p className='text-text-main text-[1rem] py-[1.2rem] font-normal' >
                                            {category.description}
                                        </p>
                                        <Button
                                            variant="transparent"
                                            className="w-full font-bold"
                                        >
                                            {category.buttonText}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ALLProductsOffres;
