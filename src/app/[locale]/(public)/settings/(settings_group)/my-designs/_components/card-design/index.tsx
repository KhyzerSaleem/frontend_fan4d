import { Button } from "@/components/ui/button";
import { fetchMyDesgin } from "@/lib/apis/my-designs";
import React from "react";

const CardDesign = async () => {
  const payload = await fetchMyDesgin();
  


  // const designs = [
  //     {
  //         id: 1,
  //         image: "/assets/images/designsImage.png",
  //         address: '23 شارع الشريف, الرياض, السعودية',
  //         name: 'تصميم مجلد صور',
  //         phone: '+9665012345675',
  //     },
  //     {
  //         id: 2,
  //         image: "/assets/images/designsImage.png",
  //         address: '123 شارع الرئيسي, نيويورك, الولايات المتحدة',
  //         name: 'تصميم مجلد صور',
  //         phone: '+1234567890',
  //     },
  //     {
  //         id: 3,
  //         image: "/assets/images/designsImage.png",
  //         address: '12 شارع الشانزليزيه, باريس, فرنسا',
  //         name: 'المنزل الثاني',
  //         phone: '+33712345678',
  //     },
  // ];

  return (
    <div className="row">
      {payload?.data?.data.map((card: designCard) => (
        
        <div key={card.id} className="w-4/12">
          <div className="px-4">
            <div className="p-[12px] rounded-sm border border-text-borders">
              {/* <img src={ card.image } alt="image" /> */}
              <div className="">
                <div className="flex flex-col gap-y-[16px] py-[16px]">
                  <h3 className="text-[1.1rem] text-text-main font-bold">
                    {card.subject}
                  </h3>
                  <div className="flex items-center gap-x-[8px]">
                    <img src="/assets/icons/clock.svg" alt="icon" />
                    {/* <span>13 سبتمبر 2024</span>
                                        <span> 08:45 PM </span> */}
                    <span>
                    {card.created_at}
                    </span>
                    <span>
                    {/* {format(new Date(card.created_at), "hh:mm a")} */}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-[16px]">
                  <Button variant="transparent" className="flex-1">
                    عرض
                  </Button>
                  {/* <div className="flex-2 p-[16px] rounded-sm cursor-pointer border border-text-borders hover:bg-[#16476D]/10">
                                        <img src="/assets/icons/trash.svg" alt="icon" />
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant={"default"} className=" md:w-1/2 w-full mt-[32px] ">
        {" "}
        احصل علي تسعيره{" "}
      </Button>
    </div>
  );
};

export default CardDesign;
