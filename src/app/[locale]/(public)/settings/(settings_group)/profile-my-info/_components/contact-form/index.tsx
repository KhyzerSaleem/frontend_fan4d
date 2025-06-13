"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProfileDailog from "../profile-dailog";
import { useMutation, useQuery } from "@tanstack/react-query";
import CitySelectField from "./city-select-field";
import { useToast } from "@/hooks/use-toast";
import { profileAction } from "@/lib/actions/settings/profile.action";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { fetchProfile } from "@/lib/apis/profile";

const ContactForm = () => {
	// translation
	const t = useTranslations();
	const BASE_URL = process.env.NEXT_PUBLIC_API;

	// Fetch cart data using react-query
	const { data: payload } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			try {
				// Try fetching from the server function
				return await fetchProfile();
			} catch (error) {
				console.error("Server fetch failed, trying fallback:", error);

				// Fallback to direct API fetch
				const response = await fetch(`${BASE_URL}/auth/profile`);
				if (!response.ok) throw new Error("Fallback fetch failed");
				return await response.json();
			}
		},
	});

	const { toast } = useToast();
	const ref = useRef<HTMLFormElement>(null);

	// Mutation
	const { mutate, isPending } = useMutation({
		mutationFn: (values: FormData) => profileAction(values),
	});

	const Schema = z.object({
		name: z.string({ required_error: "name is required" }).min(1, "name is required"),
		email: z.string({ required_error: "email is required" }).min(1, "email is required"),
		phone: z.string({ required_error: "phone is required" }).min(1, "phone is required"),
		company_name: z.string({ required_error: "company_name is required" }).min(1, "company_name is required"),
		job_name: z.string({ required_error: "job_name is required" }).min(1, "job_name is required"),
		value_added_certificate: z.string({ required_error: "value_added_certificate is required" }).min(1, "value_added_certificate is required"),
		city_id: z.string({ required_error: "city_id is required" }).min(1, "city_id is required"),
		gender: z.string({ required_error: "gender is required" }).min(1, "gender is required"),
		date_of_birth: z.string({ required_error: "date_of_birth is required" }).min(1, "date_of_birth is required"),
		value_added_certificate_file: z.string({ required_error: "value_added_certificate_file is required" }).min(1, "value_added_certificate_file is required"),

		files: z.any(),
	});

	type Inputs = z.infer<typeof Schema>;

	// Initialize form with default values
	const form = useForm<Inputs>({
		values: {
			name: payload?.data?.name || "",
			email: payload?.data?.email || "",
			company_name: payload?.data?.company_name || "",
			job_name: payload?.data?.job_name || "",
			value_added_certificate: payload?.data?.value_added_certificate || "",
			value_added_certificate_file: payload?.data?.value_added_certificate_file || "",
			city_id: payload?.data?.city_id || "",
			phone: payload?.data?.phone || "",
			date_of_birth: payload?.data?.date_of_birth || "",
			gender: payload?.data?.gender || "",
		},
		resolver: zodResolver(Schema),
	});

	// Handle Register
	const handleProfileInfo: SubmitHandler<Inputs> = async (values) => {
		if (!ref.current) return; // تأكد من أن الفورم موجود
		const formData = new FormData(ref.current);

		if (values.files instanceof FileList) {
			Array.from(values.files).forEach((file, index) => {
				if (file instanceof File) {
					formData.append(`value_added_certificate_file[${index}]`, file);
				}
			});
		}

		mutate(formData, {
			onSettled: (data, error) => {
				if (error) {
					toast({
						title: t("error_title"),
						description: error.message || t("error_description"),
						variant: "destructive",
					});
				} else {
					toast({
						title: t("success_title"),
						description: t("Form-Sent-Successfully"),
						variant: "default",
					});

					form.reset(); // إعادة تعيين النموذج بعد النجاح
				}
			},
		});
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleProfileInfo)} ref={ref}>
					<div className=" flex flex-col gap-y-[20px]">
						<div className=" block md:flex items-center  gap-x-[12px]   ">
							<div className="md:w-1/2 w-full pb-[10px] md:pb-0 ">
								<FormField
									name="name"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("name_label")} </Label>

												{/* input */}
												<Input {...field} placeholder={t("name_label")} />

												{/* feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="md:w-1/2 w-full ">
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("contact-us.email")} </Label>

												{/* input */}
												<Input {...field} placeholder="example@gmail.com" />

												{/* feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
						</div>

						<div className="block md:flex items-center  gap-x-[12px]   ">
							<div className="md:w-1/2 w-full pb-[10px] md:pb-0">
								<FormField
									name="company_name"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("companyName")} </Label>

												{/* input */}
												<Input {...field} placeholder={t("companyName")} />

												{/* feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="md:w-1/2 w-full ">
								<FormField
									name="job_name"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("jobTitle")} </Label>

												{/* input */}
												<Input {...field} placeholder={t("jobTitle")} />

												{/* feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
						</div>

						<div className="block md:flex items-center  gap-x-[12px]   ">
							<div className="md:w-1/2 w-full pb-[10px] md:pb-0">
								<FormField
									name="value_added_certificate"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("vatCertificate")} </Label>

												{/* input */}
												<Input {...field} placeholder="5757878" />

												{/* feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
							<div className="md:w-1/2 w-full">
								<FormField
									name="value_added_certificate_file"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<Label> {t("Attach-file")} </Label>

											{/* If a file exists, show a preview link; otherwise, allow file upload */}
											{field.value ? (
												<div className="space-y-2  ">
													<a href={field.value} target="_blank" rel="noopener noreferrer" className="text-[14px] font-normal leading-[20px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
														عرض الملف المرفق
													</a>
													<Button variant={"ghost"} onClick={() => field.onChange(null)} className="text-red-500 underline">
														إزالة الملف
													</Button>
												</div>
											) : (
												<Input
													type="file"
													placeholder={t("Attach-file")}
													multiple
													name={field.name}
													onChange={(e) => {
														const files = e.target.files;

														if (files) {
															field.onChange(files); // Update form field
														}
													}}
												/>
											)}

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="block md:flex items-center  gap-x-[12px]   ">
							<div className="md:w-1/2 w-full pb-[10px] md:pb-0">
								<CitySelectField control={form.control} />
							</div>
							<div className="md:w-1/2 w-full ">
								<FormField
									name="phone"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("footer.phone")} </Label>

												{/* input */}
												<Input {...field} placeholder="+966234569742" />

												{/* feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
						</div>

						<div className="block md:flex items-center  gap-x-[12px]   ">
							<div className="md:w-1/2 w-full pb-[10px] md:pb-0">
								<FormField
									name="date_of_birth"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("birthDate")} </Label>

												{/* Date Picker */}
												{/* Input */}
												<Input
													{...field}
													id="date_of_birth"
													type="date"
													placeholder="1995-08-22"
													// Ensure the value is in the correct format (YYYY-MM-DD)
													value={field.value ? field.value : ""}
													onChange={(e) => {
														const value = e.target.value;
														field.onChange(value); // This will update the form value
													}}
												/>

												{/* Feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>

							<div className="md:w-1/2 w-full">
								<FormField
									name="gender"
									control={form.control}
									render={({ field }) => {
										return (
											<FormItem>
												{/* Label */}
												<Label> {t("gender")} </Label>

												{/* Radio Group */}
												<RadioGroup
													value={field.value} // Bind the RadioGroup value to the form's field value
													onValueChange={(value) => field.onChange(value)} // Update the form's value on change
													className="flex items-center rtl:justify-end ltr:justify-start gap-y-[16px]">
													{/* Female Option */}
													<div className="flex">
														<label className="flex items-center gap-2">
															<span className="text-[16px] font-normal text-text-sub">{t("female")}</span>
															<RadioGroupItem value="female" />
														</label>
													</div>

													{/* Male Option */}
													<div className="flex">
														<label className="flex items-center gap-2">
															<span className="text-[16px] font-normal text-text-sub">{t("male")}</span>
															<RadioGroupItem value="male" />
														</label>
													</div>
												</RadioGroup>

												{/* Feedback */}
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</div>
						</div>

						<Button variant={"default"} className="md:w-1/2 w-full ">
							{isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
							{t("saveChanges")}
						</Button>
						{/* <Button variant={'transparent'} className='md:w-1/2 w-full ' > حذف الحساب </Button> */}
						<ProfileDailog />
					</div>
				</form>
			</Form>
		</>
	);
};

export default ContactForm;
