/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Control } from "react-hook-form"; // استيراد النوع المناسب
import { useTranslations } from "next-intl";

interface AreaSelectFieldProps {
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

const AreaSelectField: React.FC<AreaSelectFieldProps> = ({ control }) => {

  const t = useTranslations()

  // Functions
  const { data: payload } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/areas`);
      const payload = await response.json();
      return payload;
    },
  });

 

  return (
    <FormField
      name="area_id"
      control={control}
      render={({ field }) => (
        <FormItem>
          {/* custom Label */}
          <Label htmlFor="area_id">{t("city")}</Label>

          {/* custom Select */}
          <Select
            name="area_id"
            value={field.value} // تتبع القيمة الحالية
            onValueChange={field.onChange} // تحديث القيمة
          >
            <SelectTrigger>
              <SelectValue placeholder={t("city")} />
            </SelectTrigger>
            <SelectContent>
              {/* Render options dynamically */}
              {payload?.data?.map((area: cities) => (
                <SelectItem key={area.id} value={area.id.toString()}>
                  {area.title}
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

export default AreaSelectField;
