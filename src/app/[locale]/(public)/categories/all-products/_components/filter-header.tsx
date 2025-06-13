import React from 'react'
import SearchInput from '@/components/custom/SearchInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


const FilterHeader = () => {
    return (
        <div className="flex flex-col gap-y-4 md:flex-row items-center justify-between md:mb-[50px]">
            {/* الجزء الأول: الفلتر وفرز حسب */}
            <div className="flex items-center gap-x-4 md:w-1/4 justify-between ">
                <div className="filter px-[2rem] py-[10px] flex items-center gap-x-[12px] bg-normal w-fit rounded-[43px]">
                    <img src="/assets/icons/Filter.svg" alt="icon" />
                    <span className="text-[1rem] font-bold text-white">فلتر</span>
                </div>
                <span className="text-text-sub">فرز حسب:</span>
            </div>

            {/* الجزء الثاني: القائمة والتصفية */}
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4 w-full md:flex-1  ">
                {/* القائمة */}
                <div className="flex-1 md:w-1/3 w-1/2  ps-4">
                    <Select name="country">
                        <SelectTrigger className="h-[48px] w-full">
                            <SelectValue placeholder="الأحدث" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">الأحدث</SelectItem>
                            <SelectItem value="oldest">الأقدم</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* مربع البحث */}
                <div className=" md:w-1/2 w-1/2 ">
                    <SearchInput />
                </div>

                {/* عدد النتائج */}
                <div className="flex-1 md:w-1/3 flex md:justify-end justify-center ">
                    <span className="text-text-sub">تم العثور على 52 نتيجة</span>
                </div>
            </div>
        </div>
    )
}

export default FilterHeader
