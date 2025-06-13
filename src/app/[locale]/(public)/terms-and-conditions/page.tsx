import Breadcrumbs from "@/components/common/bread-crumb";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

const Page = async () => {
	const t = await getTranslations();
	const locale = await getLocale();

	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/app/pages/terms`, {
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
			label: t("footer.terms"),
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
							<span className="span_section"> {t("rights-and-obligations")} </span>
							<div className="flex items-center">
								<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
								<h2 className="py-[16px] h2_section">{t("conditions-service")}</h2>
							</div>
							{/* <p className="p_section pt-[12px]">
                                قبل البدء في استخدام خدماتنا، نرجو منك الاطلاع على شروط وأحكام الموقع بعناية لضمان فهمك الكامل لكافة الإجراءات المتعلقة بالطلب والدفع والخدمات المقدمة. التزامك بهذه الشروط يضمن لك تجربة مميزة.                                          </p>
                         */}
						</div>

						<div className="">
							{/* <p className=" text-[16px] md:text-[22px] font-normal text-text-sub leading-[2rem] mb-[2rem]">
                {" "}
                مرحبًا بك في موقع فن! قبل البدء في استخدام خدماتنا، نرجو منك
                قراءة وفهم الشروط والأحكام التالية بعناية. باستخدامك للموقع
                والخدمات المقدمة، فإنك توافق على الالتزام بهذه الشروط والأحكام.
                إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام الموقع.
              </p> */}

							{/* <ol className=" pl-6 space-y-8">
                <li className="text-lg">
                  <strong className=" text-[16px] md:text-[18px]  font-normal text-text-main leading-[2rem] ">
                    {" "}
                    1. قبول الشروط{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    من خلال الدخول إلى موقع فن واستخدامه، فإنك تقر وتوافق على
                    الالتزام بكافة الشروط والأحكام المذكورة هنا. قد يتم تحديث
                    هذه الشروط من وقت لآخر، لذا يُنصح بمراجعتها بانتظام.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    2. استخدام الموقع{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    يجب استخدام الموقع فقط لأغراض قانونية. لا يجوز لك استخدام
                    الموقع أو خدماته في أي نشاط غير قانوني أو مضر بحقوق الآخرين
                    أو من شأنه تعطيل أو إعاقة تقديم الخدمات.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    3. الحسابات الشخصية{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    لتتمكن من الاستفادة من بعض خدمات الموقع، قد يُطلب منك إنشاء
                    حساب. يجب عليك تقديم معلومات دقيقة وحقيقية، وأنت مسؤول عن
                    الحفاظ على سرية بيانات الحساب. أنت مسؤول عن جميع الأنشطة
                    التي تحدث باستخدام حسابك.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    4. شروط الدفع{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    يتم قبول الدفع عبر الإنترنت باستخدام طرق الدفع المتاحة على
                    الموقع. يجب عليك دفع المبالغ المستحقة وفقًا للشروط المحددة.
                    في حالة حدوث مشاكل في الدفع أو فشل المعاملات، سيتم اتخاذ
                    الإجراءات المناسبة حسب سياسات الموقع.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    5. حقوق الملكية الفكرية{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    جميع المحتويات الموجودة على الموقع، بما في ذلك النصوص،
                    الصور، الرسومات، والشعارات، هي ملك لـ فن أو مرخصة لنا. يحظر
                    نسخ أو توزيع أي من هذه المواد بدون إذن مسبق.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    6. إخلاء المسؤولية{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    نحن لا نتحمل أي مسؤولية عن الأضرار التي قد تحدث نتيجة
                    لاستخدام الموقع أو عدم توفره، سواء كانت هذه الأضرار مباشرة
                    أو غير مباشرة. نحن نبذل جهدًا كبيرًا لضمان تقديم خدمات
                    موثوقة، ولكننا لا نضمن أن الموقع سيكون خاليًا من الأخطاء في
                    جميع الأوقات.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    7. التعديلات على الشروط{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    نحتفظ بحقنا في تعديل هذه الشروط في أي وقت دون إشعار مسبق.
                    يُنصح بمتابعة هذه الصفحة بانتظام للبقاء على اطلاع بأحدث
                    التعديلات.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    8. سياسة الخصوصية{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    تلتزم فن بحماية خصوصيتك. لمزيد من التفاصيل حول كيفية جمع
                    واستخدام معلوماتك الشخصية، يرجى الاطلاع على سياسة الخصوصية
                    الخاصة بنا.{" "}
                  </p>
                </li>

                <li className="text-lg">
                  <strong className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    9. التواصل معنا{" "}
                  </strong>
                  <p className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]">
                    {" "}
                    إذا كان لديك أي استفسارات حول هذه الشروط والأحكام أو أي جزء
                    من خدماتنا، يمكنك التواصل معنا عبر وسائل الاتصال المتاحة في
                    الموقع.{" "}
                  </p>
                </li>
              </ol> */}

							{/* <ol className="pl-6 space-y-8">
                {payload?.data?.body.includes("<ol>") &&
                  payload?.data?.body
                    .match(/<li>(.*?)<\/li>/g)
                    ?.map((item: string, index: number) => (
                      <li key={index} className="text-lg">
                        <span
                          className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]"
                        
                        />
                      </li>
                    ))}
              </ol> */}

							<div className="text-[16px] md:text-[18px] font-normal text-text-main leading-[2rem]" />
							{stripHtml(payload?.data?.body)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;
