import Breadcrumbs from "@/components/common/bread-crumb";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const Page = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	// Fetch slides data from API
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/app/pages/privacy`, {
		method: "GET",
		cache: "no-store",
		headers: {
			lang: locale,
		},
	});

	const payload = await response.json();

	const breadcrumbItems = [
		{
			href: "/",
			// label: "الرئيسية",
			icon: "/assets/icons/home.svg",
		},
		{
			label: t("breadcrumb-privacy"),
		},
	];
	const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto ">
					<div className="row">
						<div className="col-span-full mb-12">
							<span className="span_section"> {t("privacy-title")}</span>
							<div className="flex items-center">
								<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
								<h2 className="py-[16px] h2_section">{t("privacy-subtitle")}</h2>
							</div>
						</div>

						<div className="text-[16px] md:text-[22px] font-normal text-text-sub leading-[2rem] mb-[2rem]">
							{/* Display the body content from the API */}

							{stripHtml(payload?.data?.body || "")}
						</div>

						{/* <div className="">
                            <p className=" text-[16px] md:text-[22px] font-normal text-text-sub leading-[2rem] mb-[2rem]">نحن في فن نلتزم بحماية خصوصيتك وحقوقك الرقمية أثناء استخدامك لخدماتنا. من خلال هذه السياسة، نوضح كيفية جمع المعلومات الشخصية، استخدامها، وحمايتها. نحن نقدر ثقتك فينا، ونسعى لتقديم تجربة آمنة وموثوقة لك.</p>

                            <ol className=" pl-6 space-y-8">
                                <li className="text-lg">
                                    <strong className=" text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem] ">1. المعلومات التي نجمعها:</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >نقوم بجمع المعلومات الشخصية التي تقدمها لنا طواعية، مثل اسمك، عنوانك، بريدك الإلكتروني، وبيانات الدفع، عند تسجيلك في الموقع أو عند تقديم طلباتك. كما نقوم أيضًا بجمع معلومات عن سلوكك عبر الموقع لتحسين تجربتك.</p>
                                </li>

                                <li className="text-lg">
                                    <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">2. كيفية استخدام المعلومات:</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >نستخدم المعلومات التي نجمعها لتحسين خدماتنا، تخصيص تجربتك، معالجة الطلبات، إرسال تحديثات حول طلباتك أو العروض الجديدة. قد نستخدم بياناتك لأغراض التسويق أو الإعلانات فقط إذا كنت قد وافقت على ذلك.</p>
                                </li>

                                <li className="text-lg">
                                    <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">3. حماية المعلومات:</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >نحن نستخدم تقنيات أمان متقدمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو الاستخدام غير المناسب. نقوم بتخزين بياناتك في بيئة آمنة وتطبيق التدابير الأمنية المناسبة للحفاظ على سلامتها.</p>
                                </li>

                                <li className="text-lg">
                                    <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">4. مشاركة المعلومات مع أطراف ثالثة:</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >لا نشارك معلوماتك الشخصية مع أطراف ثالثة، إلا في الحالات التي نكون فيها ملزمين قانونًا بذلك أو عندما يكون ذلك ضروريًا لتوفير خدماتنا، مثل شركات الشحن.</p>
                                </li>

                                <li className="text-lg">
                                    <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">5. حقوقك في الخصوصية</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >لك الحق في الوصول إلى معلوماتك الشخصية وتحديثها أو تصحيحها. يمكنك أيضًا طلب حذف معلوماتك الشخصية وفقًا للقوانين المعمول بها. إذا كنت ترغب في ممارسة أي من هذه الحقوق، يمكنك التواصل معنا عبر تفاصيل الاتصال المدرجة في أسفل الصفحة.</p>
                                </li>

                                <li className="text-lg">
                                    <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">6. التعديلات على سياسة الخصوصية</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >قد نقوم بتعديل سياسة الخصوصية من وقت لآخر. سيتم نشر أي تغييرات هنا، وسيتم تحديث تاريخ التعديل في أسفل الصفحة. ننصحك بمراجعة هذه السياسة بانتظام لتبقى على اطلاع دائم بما يخص خصوصيتك</p>
                                </li>

                                <li className="text-lg">
                                    <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">7. تواصل معنا</strong>
                                    <p className='text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]' >إذا كان لديك أي استفسارات بشأن سياسة الخصوصية الخاصة بنا أو كيفية معالجة بياناتك الشخصية، لا تتردد في الاتصال بنا عبر البريد الإلكتروني أو من خلال وسائل الاتصال المتاحة على موقعنا.</p>
                                </li>

                                <li>
                                    <strong className="text-[16px] md:text-[18px] font-bold text-text-main leading-[2rem]"> تاريخ التعديل: ديسمبر 2024 </strong>
                                </li>

                            </ol>
                        </div> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;
