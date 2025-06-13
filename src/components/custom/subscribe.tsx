import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SubscribeProps {
    title: string;
    subtitle: string;
    spanText: string;
    placeholder: string;
    buttonText: string;
}

const Subscribe: React.FC<SubscribeProps> = ({ title, subtitle, placeholder, buttonText , spanText }) => {


    return (
        <section className="section">
            <div className="container mx-auto">
                <div className="row">
                    <div className="relative">
                        <div className="ImageBox">
                            <img
                                src="/assets/images/Discount-Bannar.png"
                                alt="image"
                                className="object-cover w-full md:h-full h-svh "
                            />
                        </div>
                        {/* قسم النصوص */}
                        <div className="text-center w-full px-[30px] md:!w-1/2 col-span-full absolute top-[50%] left-[50%] transform translate-x-[-50%] -translate-y-[50%]">
                            <span className='span_section !text-white '> {spanText} </span>

                            <h2 className="py-[16px] h2_section line-bottom after:!bg-white !text-white">
                                {title}
                            </h2>
                            <p className="p_section !text-white">{subtitle}</p>
                            {/* نموذج الاشتراك */}
                            <div className="relative mt-[33px] ">
                                <Input
                                    placeholder={placeholder}
                                    // value={''}
                                    className=" bg-white " // لإضافة مساحة للزر داخل الإدخال
                                />
                                <Button
                                    variant="primary"
                                    className="absolute rtl:left-0 ltr:right-0 h-[58px] rtl:rounded-r-none ltr:rounded-s-none top-1/2 -translate-y-1/2"

                                >
                                    { buttonText }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;
