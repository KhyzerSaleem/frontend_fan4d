"use client";
import { Button } from '@/components/ui/button';
import React from 'react';

// بيانات الطلبات
const orders = [
  {
    id: '#7557484',
    price: '230 ر.س',
    location: 'مدينة الرياض بوليفارد، الرياض',
    date: '13 سبتمبر 2024',
    time: '08:45 PM',
  },
  {
    id: '#1234567',
    price: '450 ر.س',
    location: 'جدة كورنيش، جدة',
    date: '10 سبتمبر 2024',
    time: '06:30 PM',
  },
  {
    id: '#9876543',
    price: '150 ر.س',
    location: 'الدمام، حي الواجهة البحرية',
    date: '15 سبتمبر 2024',
    time: '04:15 PM',
  },
];

const AllOrders = () => {
  return (
    <div className="row">
      {orders.map((order, index) => (
        <div className="md:w-4/12 w-full mb-[20px] md:mb-0 " key={index}>
          <div className="md:pl-4 ">
            <div className="p-[12px] border border-text-borders rounded-sm flex flex-col gap-y-[16px]">
              {/* رقم الطلب والسعر */}
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-normal text-text-sub">{order.id}</span>
                <span className="text-[20px] font-bold text-text-main">{order.price}</span>
              </div>
              {/* الموقع */}
              <div className="flex items-center gap-x-[12px]">
                <img src="/assets/icons/location1.svg" alt="icon" width={24} height={24} />
                <p className="text-[1rem] font-normal text-text-sub">{order.location}</p>
              </div>
              {/* التاريخ والوقت */}
              <div className="flex items-center gap-x-[12px]">
                <img src="/assets/icons/clock.svg" alt="icon" />
                <p className="text-[1rem] font-normal text-text-sub">{order.date}</p>
                <p className="text-[1rem] font-normal text-text-sub">{order.time}</p>
              </div>
              {/* الأزرار */}
              <div className="flex flex-col gap-y-[16px]">
                <Button variant={"default"}>عرض تفاصيل الطلب</Button>
                <Button variant={"transparent"}>إلغاء الطلب</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
