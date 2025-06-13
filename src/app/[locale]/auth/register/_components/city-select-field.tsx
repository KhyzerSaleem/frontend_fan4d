/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Control } from "react-hook-form";

interface CitySelectFieldProps {
    control: Control<{
        name: string;
        city_id: string;
        email: string;
        password: string;
        phone: string;
        remember?: boolean | undefined;
    }, any>
}

const CitySelectField: React.FC<CitySelectFieldProps> = ({ control }) => {

    // Functions
    const { data: payload } = useQuery({
        queryKey: ['cities'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/helpers/cities`)
            // fetch(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/cities`)
            const payload = await response.json()
            return payload
        }
    });



    return (
        <FormField
            name="city_id"
            control={control}
            render={({ field }) => (
                <FormItem>
                    {/* custom Label */}
                    <Label htmlFor="city_id">المدينة</Label>

                    {/* custom Select */}
                    <Select
                        name="city_id"
                        value={field.value} // تتبع القيمة الحالية
                        onValueChange={field.onChange} // تحديث القيمة
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="اختر مدينة" />
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
