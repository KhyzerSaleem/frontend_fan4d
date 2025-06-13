import { Button } from '@/components/ui/button'
import React from 'react'

const Discount = () => {
    return (
        <section className='section' >
            <div className="flex flex-wrap bg-customPalette-300 ">
                <div className="md:w-6/12">
                    <img src="/assets/images/SpecialDiscount1.png" alt="image" className='w-full h-full object-cover' />
                </div>
                <div className="md:w-6/12">
                    <div className='md:p-[80px] p-[1rem] ' >
                        <div className="col-span-full mb-12">
                            <span className="span_section !text-white "> احصل على طباعة مميزة بأعلى جودة </span>
                            <div className="flex items-center">
                                <div className="line ltr:mr-[20px] rtl:ml-[20px] !bg-white "></div>
                                <h2 className="py-[16px] h2_section !text-white ">
                                    خصم خاص على جميع خدمات الطباعة الفاخرة
                                </h2>
                            </div>
                            <p className="p_section pt-[12px] !text-white ">
                                استمتع بخصم مميز على خدمات الطباعة الفاخرة. نقدم لك طباعة بأعلى جودة باستخدام أحدث التقنيات وأفضل أنواع الورق. سواء كنت بحاجة للطباعة الشخصية أو التجارية، نحن هنا لنقدم لك خدمة متميزة تحقق لك النتائج المثالية التي تناسب احتياجاتك بشكل دقيق وفائق الجودة.
                            </p>

                            <Button variant={'transparent'} className='md:w-1/2 w-full mt-[32px] !text-white !border-white' > تصفح الفئات الآن </Button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Discount