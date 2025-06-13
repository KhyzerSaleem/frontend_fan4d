import Breadcrumbs from '@/components/common/bread-crumb';
import React from 'react';
import ContactForm from './_components/contact-form';
import ImagesProduct from './_components/images-product';

const Page = () => {
    const breadcrumbItems = [
        {
            href: "/",
            // label: "الرئيسية",
            icon: "/assets/icons/home.svg",
        },
        {
            label: " الفئات ",
        },
        {
            label: " الملابس والأقمشة ",
        },
        {
            label: " تغليف عبوات فريدة ",
        },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="section">
                <div className="container mx-auto">
                    <div className="col-span-full mb-12">
                        <div className="flex items-center">
                            <h2 className="py-[16px] h2_section">
                                تغليف عبوات فريدة
                            </h2>
                        </div>
                        <div className=' block md:flex gap-x-[15px]   items-center ' >
                            <p className=' md:text-[2rem] text-[1.2rem] font-bold text-normal ' > 120 ريال سعودي </p>
                            <p className='md:text-[1.5rem] text-[1rem] font-bold text-text-placeholder line-through py-[6px] md:py-0 ' > 120 ريال سعودي </p>
                            <div className=' py-[3.077px] px-[10.258px] flex items-center  justify-center bg-accent-danger-light rounded-[30.774px] w-fit ' >
                                <span className='text-[1rem] font-normal text-accent-danger' > 64% خصم </span>
                            </div>
                        </div>
                        <p className='p_section py-[30px] ' >
                            تغليف العبوات الفريدة يتميز بجودة عالية وأناقة فائقة، حيث يُستخدم الكرتون المقوى والأغلفة البلاستيكية المتينة لضمان حماية المنتجات بشكل مثالي. التصميم المبتكر والجذاب يعكس هوية العلامة التجارية بألوان وشعارات مخصصة.
                        </p>
                    </div>
                    <div className="row ">

                        <div className=" w-full md:w-6/12">
                            <div className='md:pl-6' >
                                <h2 className='text-[20px] font-bold text-text-main mb-[24px] ' > المواصفات </h2>
                                <div>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-6/12' >
                            <div>
                                <ImagesProduct />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
