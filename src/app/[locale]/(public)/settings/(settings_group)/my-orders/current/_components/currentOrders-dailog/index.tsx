"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form , FormField, FormItem, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from "@/components/ui/textarea";


const CurrentOrdersDailog = () => {

    // translation
    // const t = useTranslations()

    const form = useForm()

    // const onSubmit: SubmitHandler<{}> = async (values) => {

    // }

    const [selectedMethod, setSelectedMethod] = useState("cash");


    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='px-[32px] py-[16px] bg-accent-danger-light  text-accent-danger w-fit rounded-sm cursor-pointer' > إلغاء الطلب </div>
            </DialogTrigger>

            <DialogContent className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-md p-6">
                <DialogHeader className="mt-4">
                    <DialogTitle className="text-lg font-bold text-gray-800 rtl:text-right">
                        سبب الالغاء
                    </DialogTitle>
                    <DialogDescription className="text-[14px] font-normal text-gray-800 rtl:text-right" > الرجاء اختيار سبب الإلغاء: </DialogDescription>
                </DialogHeader>

                <div className="my-8">
                    <Form {...form} >
                        <form 
                        // onSubmit={form.handleSubmit(onSubmit)} 
                        >
                            <div className=' flex flex-col gap-y-[20px]'  >

                                <RadioGroup
                                    value={selectedMethod}
                                    onValueChange={(value) => setSelectedMethod(value)}
                                    className="flex flex-col items-end gap-y-[16px]  "
                                >
                                    <div className="flex">
                                        <label className="flex items-center justify-end gap-2">
                                            <span className="text-[16px] font-normal text-text-sub"> اسباب شخصية </span>
                                            <RadioGroupItem value="cash" />
                                        </label>
                                    </div>

                                    <div className="flex">
                                        <label className="flex items-center justify-end gap-2">
                                            <span className="text-[16px] font-normal text-text-sub"> أخرى </span>
                                            <RadioGroupItem value="mady" />
                                        </label>
                                    </div>

                                </RadioGroup>

                                <div   >
                            <FormField
                                name='username'
                                control={form.control}
                                render={({ field }) => {
                                    return <FormItem>

                                        {/* input */}
                                        <Textarea {...field} placeholder='أدخل سبب' />

                                        {/* feedback */}
                                        <FormMessage />


                                    </FormItem>
                                }}
                            />
                        </div>

                            </div>

                        </form>
                    </Form>
                </div>

                <div className='block md:flex  items-center justify-between w-full gap-x-[32px]'>

                    <DialogTrigger asChild >
                        <Button className=' w-full md:mb-0 mb-5   ' variant={"default"} > عودة </Button>
                    </DialogTrigger>

                    <Button className=' w-full ' variant={"transparent"} > تأكيد </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CurrentOrdersDailog;
