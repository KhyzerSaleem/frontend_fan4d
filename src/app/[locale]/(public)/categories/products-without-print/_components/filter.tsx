// "use client";

// import React from "react";
// import {
//     Accordion,
//     AccordionItem,
//     AccordionTrigger,
//     AccordionContent,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { Button } from "@/components/ui/button";

// const Filter = () => {
//     const [priceRange] = React.useState<[number, number]>([250, 750]);

//     // const handlePriceChange = (value: any) => {
//     //     setPriceRange(value);
//     // };

//     return (
//         <div className="">
//             <Accordion type="single" collapsible>
//                 <AccordionItem value="item-1">
//                     <AccordionTrigger className="text-[1.2rem] font-bold text-text-main">
//                         اللون
//                     </AccordionTrigger>
//                     <AccordionContent>
//                         <div className="flex flex-col gap-y-[20px]">
//                             <div className="  flex items-start justify-between " >
//                                 <div className="flex gap-x-[8px] items-center">
//                                     <Checkbox id="red" />
//                                     <Label htmlFor="red">أحمر</Label>
//                                 </div>
//                                 <div>
//                                     <span className="text-[14px] font-normal text-text-sub" > (134) </span>
//                                 </div>
//                             </div>
//                             <div className="  flex items-start justify-between " >
//                                 <div className="flex gap-x-[8px] items-center">
//                                     <Checkbox id="blue" />
//                                     <Label htmlFor="blue">أزرق</Label>
//                                 </div>
//                                 <div>
//                                     <span className="text-[14px] font-normal text-text-sub" > (134) </span>
//                                 </div>
//                             </div>

//                         </div>
//                     </AccordionContent>
//                 </AccordionItem>
//                 <AccordionItem value="item-2">
//                     <AccordionTrigger className="text-[1.2rem] font-bold text-text-main">
//                         السعر
//                     </AccordionTrigger>
//                     <AccordionContent>
//                         <div className="flex flex-col gap-y-4 py-[10px] ">
//                             <Slider
//                                 range
//                                 min={0}
//                                 max={1000}
//                                 step={10}
//                                 value={priceRange}
//                                 // onChange={handlePriceChange}
//                                 railStyle={{
//                                     backgroundColor: "#E8EDF0",
//                                     height: "6px"
//                                 }}
//                                 trackStyle={{ backgroundColor: "#16476D", height: "6px" }}
//                                 handleStyle={{
//                                     borderColor: "#16476D",
//                                     backgroundColor: "#fff",
//                                     width: "18px",
//                                     height: "18px",
//                                 }}
//                             />
//                             <div className="flex items-start justify-between" >
//                                 <div className="text-[14px] font-normal text-text-main ">
//                                     السعر: <span className=" text-[16px] font-bold text-text-main  " > {priceRange[0]} - {priceRange[1]} ريال </span>
//                                 </div>
//                                 <div>
//                                     <span className="text-[14px] font-normal text-text-sub" > (134) </span>
//                                 </div>
//                             </div>
//                         </div>

//                     </AccordionContent>
//                 </AccordionItem>
//             </Accordion>
//             <div className="buttons mt-[16px] flex justify-between gap-x-[16px] " >
//                 <Button variant={"default"} className="w-1/2" > تطبيق </Button>
//                 <Button variant={"transparent"}  className="w-1/2" >  إعادة ضبط </Button>
//             </div>
//         </div>
//     );
// };

// export default Filter;
