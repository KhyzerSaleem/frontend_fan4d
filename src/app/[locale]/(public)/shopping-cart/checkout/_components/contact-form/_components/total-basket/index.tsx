// "use client"
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import React, { useState } from 'react'
// import Orderdailog from '../../../order-dailog';


// const TotalBasket = () => {

//     const [selectedMethod, setSelectedMethod] = useState("cash");

//     return (
//         <>
//             <div className='px-[20px] py-[16px] border border-text-borders rounded-sm' >
//                 <h2 className=' text-[18px] font-bold text-text-main ' >
//                     إجمالي السلة
//                 </h2>

//                 <div className='flex flex-col gap-y-[14px] ' >
//                     <div className='flex justify-between items-center py-[12px] border-b border-text-borders ' >
//                         <span className='text-[16px] font-normal text-text-sub ' > المجموع الفرعي </span>
//                         <span className='text-[14px] font-normal text-text-main '  > 480 ريال سعودي </span>
//                     </div>
//                     <div className='flex justify-between items-center py-[12px] border-b border-text-borders ' >
//                         <span className='text-[16px] font-normal text-text-sub ' > الشحن </span>
//                         <span className='text-[14px] font-normal text-text-main '  > 20 ريال سعودي </span>
//                     </div>
//                     <div className='flex justify-between items-center py-[12px] border-b border-text-borders ' >
//                         <span className='text-[16px] font-normal text-text-sub ' > الخصم </span>
//                         <span className='text-[14px] font-normal text-accent-danger '  > -20 ريال سعودي</span>
//                     </div>
//                     <div className='flex justify-between items-center py-[12px] border-b border-text-borders ' >
//                         <span className='text-[16px] font-normal text-text-sub ' > المجموع </span>
//                         <span className='text-[16px] font-bold text-text-main '  > 480 ريال سعودي </span>
//                     </div>
//                 </div>

//             </div>
//             <div className="px-[20px] py-[16px] border border-text-borders rounded-sm">
//                 <h2 className="text-[18px] font-bold text-text-main mb-[14px] ">طريقة الدفع</h2>

//                 <RadioGroup
//                     value={selectedMethod}
//                     onValueChange={(value) => setSelectedMethod(value)}
//                     className="flex flex-col items-end gap-y-[16px]  "
//                 >
//                     <div className="flex">
//                         <label className="flex items-center justify-end gap-2">
//                             <span className="text-[16px] font-normal text-text-sub">الدفع عند الاستلام</span>
//                             <RadioGroupItem value="cash" />
//                         </label>
//                     </div>

//                     <div className="flex">
//                         <label className="flex items-center justify-end gap-2">
//                             <span className="text-[16px] font-normal text-text-sub"> مدي </span>
//                             <RadioGroupItem value="mady" />
//                         </label>
//                     </div>

//                     <div className="flex">
//                         <label className="flex items-center justify-end gap-2">
//                             <span className="text-[16px] font-normal text-text-sub"> PayPal </span>
//                             <RadioGroupItem value="PayPal" />
//                         </label>
//                     </div>

//                     <div className="flex">
//                         <label className="flex items-center justify-end gap-2">
//                             <span className="text-[16px] font-normal text-text-sub"> Apple Pay </span>
//                             <RadioGroupItem value="Apple" />
//                         </label>
//                     </div>
//                 </RadioGroup>

//                 {/* <Button variant={"default"} className='w-full mt-[14px] ' > اطلب الآن </Button> */}
//                 <Orderdailog />

//             </div>
//         </>
//     )
// }

// export default TotalBasket