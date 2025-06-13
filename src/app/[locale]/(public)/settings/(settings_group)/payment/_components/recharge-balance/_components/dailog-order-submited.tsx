// "use client"
// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useQuery } from "@tanstack/react-query";

// interface DialogOrderSubmittedProps {
//   points: number;
//   money: number;
// }

// export const DailogOrderSubmited: React.FC<DialogOrderSubmittedProps> = ({ points, money }) => {
//   const [isPointsFetched, setIsPointsFetched] = useState(false);

//   const { data: userPointsData, isLoading: isLoadingPoints, isError: isErrorPoints } = useQuery({
//     queryKey: ["points-change"],
//     queryFn: async () => {
//       const response = await fetch("https://dashboard.fan4d.sa/api/points-change");
//       if (!response.ok) {
//         throw new Error("Failed to fetch points");
//       }
//       return response.json();
//     },
//     enabled: isPointsFetched,
//   });

  

//   const handleFetchPoints = () => {
//     if (!isPointsFetched) {
//       setIsPointsFetched(true);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant={"default"} className="!w-full mb-5" onClick={handleFetchPoints}>
//           أسترد نقاطك
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
//         <div className="my-[10px]">
//           <div className="text-center flex justify-center items-center">
//             <img src="/assets/icons/congrats.svg" alt="icon" />
//           </div>

//           <div className="flex justify-center items-center flex-col gap-y-[12px] my-[20px]">
//             <h2 className="h2_section"> مبروك! </h2>
//             <p className="p_section"> تم استرداد نقاطك بنجاح!</p>
//             <h2 className="md:text-[1.5rem] text-[1rem] font-bold text-normal">
//               {points} نقطة = {money} ريال سعودي
//             </h2>
//           </div>

//           {/* {isLoadingPoints && <p>Loading your points...</p>}
//           {isErrorPoints && <p>Failed to fetch points. Please try again.</p>} */}

//           <div className="block md:flex items-center justify-between gap-x-[30px] w-full ">
//             <Button className="w-full" variant="default">
//               تسوق الآن
//             </Button>
//             <Button className="w-full" variant="transparent">
//               الذهاب للرئيسية
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
