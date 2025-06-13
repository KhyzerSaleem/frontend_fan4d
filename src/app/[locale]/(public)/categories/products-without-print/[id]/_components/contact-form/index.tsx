"use client"
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'

const ContactForm = () => {

    // translation
    // const t = useTranslations()

    const form = useForm()

    // const onSubmit: SubmitHandler<{}> = async (values) => {
    
    // }

    return (
        <>
            <Form {...form} >
                <form 
                // onSubmit={form.handleSubmit(onSubmit)} 
                >
                    <div className='flex flex-col gap-y-[20px] '>

                        {/* قائمة الاختيار */}
                        <div className=' flex flex-col gap-y-[6px] ' >
                            <Label> لون الوجه الأول </Label>
                            <Select name="country">
                                <SelectTrigger className='h-[48px]'>
                                    <SelectValue placeholder="CMYK" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">الأحدث</SelectItem>
                                    <SelectItem value="oldest">الأقدم</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex items-center  gap-x-[12px]  ' >
                            <div className='w-1/2 flex flex-col gap-y-[6px]  ' >
                                <Label> المقاس  </Label>
                                <Select name="country">
                                    <SelectTrigger className='h-[48px]'>
                                        <SelectValue placeholder="23 شارع الشريف, الرياض, السعودية" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">الأحدث</SelectItem>
                                        <SelectItem value="oldest">الأقدم</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='w-1/2 flex flex-col gap-y-[6px]  '  >
                                <Label> الوجة </Label>
                                <Select name="country">
                                    <SelectTrigger className='h-[48px]'>
                                        <SelectValue placeholder="2" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">الأحدث</SelectItem>
                                        <SelectItem value="oldest">الأقدم</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* قائمة الاختيار */}
                        <div className=' flex flex-col gap-y-[6px] ' >
                            <Label> الكمية </Label>
                            <Select name="country">
                                <SelectTrigger className='h-[48px]'>
                                    <SelectValue placeholder="100" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">الأحدث</SelectItem>
                                    <SelectItem value="oldest">الأقدم</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex gap-x-[6px] items-center ' >
                            <Checkbox id="terms" />
                            <Label htmlFor="terms"> مخصص </Label>
                        </div>

                        {/* قائمة الاختيار */}
                        <div className=' flex flex-row gap-x-[6px] items-center ' >
                            <div className='w-11/12 flex flex-col gap-y-[6px] ' >
                                <Label> نوع المادة </Label>
                                <Select name="country">
                                    <SelectTrigger className='h-[48px]'>
                                        <SelectValue placeholder="كوشية مطفي 350 جرام" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">الأحدث</SelectItem>
                                        <SelectItem value="oldest">الأقدم</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='w-[48px] h-[48px] rounded-sm bg-text-sub mt-6 ' ></div>
                        </div>

                        <div className='flex gap-x-[6px] items-center ' >
                            <Checkbox id="terms" />
                            <Label htmlFor="terms"> سولفان </Label>
                        </div>

                        <div className='flex gap-x-[6px] items-center ' >
                            <Checkbox id="terms" />
                            <Label htmlFor="terms"> سبوت يوفى </Label>
                        </div>


                        <div className=' block md:flex items-center gap-x-[12px] ' >
                            {/* زر الإرسال */}
                            <Button variant={'default'} className='md:w-3/4 w-full '>
                                <img src="/assets/icons/bag-2.svg" alt="icon" />
                                أضف إلى السلة
                            </Button>

                            <div className='flex items-center pt-6 md:pt-0 ' >
                                <div className= ' w-full flex items-center justify-between gap-x-[12px] ' >
                                    <div className=' p-[0px] w-[56px] h-[56px] flex justify-center items-center bg-light-active  rounded-sm  ' >
                                        <img src="/assets/icons/heart2.svg" alt="icon" />
                                    </div>

                                    <div className='flex items-center justify-center p-[9px] border border-text-borders  rounded-sm ' >
                                        <Button className='bg-[#F1F4F4] p-[0px] w-[40px] h-[40px] rounded-sm' >
                                            <img src="/assets/icons/plus 1.svg" alt="icon" />
                                        </Button>
                                        <span className='text-[18px] font-bold px-[12px] ' > 5 </span>
                                        <Button className='bg-[#F1F4F4] p-[0px] w-[40px] h-[40px] rounded-sm]' >
                                            <img src="/assets/icons/Minus.svg" alt="icon" />
                                        </Button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </form>
            </Form>
        </>
    )
}

export default ContactForm
