import React from "react";
import { DailogInfo } from "./_components/dailog-info";
import { DailogPointsAdd } from "./_components/dailog-poinst-add";
import { getTranslations } from "next-intl/server";

interface PointsData {
  points?: number;
  money?: number;
}

const RechargeBalance = async ({ points = 0, money = 0 }: PointsData) => {

  const t = await getTranslations()

  return (
    <div>
      <div
        className="bg-cover bg-center h-60 relative"
        style={{
          backgroundImage: `url('/assets/images/paymentImg.png')`,
          borderRadius: "0px 0px 32px 32px",
        }}
      >
        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[8px]">
            <span className="md:text-[1rem] text-[0.8rem] font-normal text-normal">
            {t("available-balance")}            
            </span>
            <h2 className="md:text-[1.5rem] text-[1rem] font-bold text-normal">
              {points} {t("points.points")} = {money} {t("Saudi-Riyal")}
            </h2>
            <p className="text-[1rem] text-[#5A5D61]">
            {t("balance-will-be-added-automatically")}
            </p>

            <DailogInfo />

          </div>
          <div className=" " >
            <DailogPointsAdd points={points} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeBalance;
