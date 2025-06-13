/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Control } from "react-hook-form";
import { useTranslations } from "next-intl";

interface CitySelectFieldProps {
	control: Control<
		{
			city_id: string;
			title: string;
			street: string;
			area_id: string;
			house_number: string;
			address?: string | undefined;
			lat?: string | undefined;
			lng?: string | undefined;
		},
		any
	>;
}

const CitySelectField: React.FC<CitySelectFieldProps> = ({ control }) => {
	const t = useTranslations();

	// Functions
	const { data: payload } = useQuery({
		queryKey: ["cities"],
		queryFn: async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/cities`);
			const payload = await response.json();
			return payload;
		},
	});

	return (
		<FormField
			name="city_id"
			control={control}
			render={({ field }) => (
				<FormItem>
					{/* custom Label */}
					<Label htmlFor="city_id">{t("country")}</Label>

					{/* custom Select */}
					<Select
						name="city_id"
						value={field.value} // تتبع القيمة الحالية
						onValueChange={field.onChange} // تحديث القيمة
					>
						<SelectTrigger>
							<SelectValue placeholder={t("country")} />
						</SelectTrigger>
						<SelectContent>
							{/* Render options dynamically */}
							{payload?.data?.map((city: cities) => (
								<SelectItem key={city.id} value={city.id.toString()}>
									{city.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* feedback */}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default CitySelectField;
