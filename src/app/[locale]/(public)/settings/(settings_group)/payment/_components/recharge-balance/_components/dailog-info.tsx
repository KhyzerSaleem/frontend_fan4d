import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LuInfo } from "react-icons/lu";
import { getLocale, getTranslations } from "next-intl/server";

interface PayloadItem {
	key: string;
	value: string;
}

interface Payload {
	data: PayloadItem[];
}
export const DailogInfo = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/app/settings`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload: Payload = await response.json();

	const reward_points = payload.data.find((item) => item.key === "reward_points")?.value;
	const reward_money = payload.data.find((item) => item.key === "reward_money")?.value;
	const order_money = payload.data.find((item) => item.key === "order_money")?.value;
	const order_points = payload.data.find((item) => item.key === "order_points")?.value;

	const pointsInfo = [
		t("points.earn", { points: order_points ?? "1", money: order_money ?? "1" }),
		t("points.exchange", { reward_points: reward_points ?? "12", reward_money: reward_money ?? "1" }),
		t("points.use_anywhere"),
		t("points.based_on_spending"),
		t("points.value_may_change"),
		t("points.expiry_notice"),
		t("points.cancel_policy"),
	];

	return (
		<Dialog>
			<DialogTrigger>
				<div className="flex items-center gap-x-2 text-[14px] font-bold text-accent-danger cursor-pointer">
					<LuInfo size={24} className="text-accent-danger" />
					{t("points.learn_more")}
				</div>
			</DialogTrigger>

			<DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
				<div className="my-[10px]">
					<h2 className="h2_section"> {t("points.title")} </h2>

					<div className="text-center flex justify-center items-center">
						<img src="/assets/icons/International.svg" alt="icon" />
					</div>

					<ol className="mt-4 space-y-2 text-[14px] text-text-main font-medium list-decimal list-inside">
						{pointsInfo.map((point, index) => (
							<li className=" text-text-sub font-normal text-[1rem] " key={index}>
								{point}
							</li>
						))}
					</ol>
				</div>
			</DialogContent>
		</Dialog>
	);
};
