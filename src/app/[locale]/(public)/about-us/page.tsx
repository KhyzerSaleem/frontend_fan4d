import React from "react";
import Breadcrumbs from "@/components/common/bread-crumb";

const Page = () => {
	const breadcrumbItems = [
		{
			href: "/",
			// label: "الرئيسية",
			icon: "/assets/icons/home.svg",
		},
		{
			label: "من نحن",
		},
	];

	const data = [
		{ title: "1418 هـ", description: "سنة التأسيس" },
		{ title: " أكثر من 1000  ", description: "عميل راضٍ" },
		{ title: " أكثر من 50  ", description: " خدمة متنوعة " },
		{ title: " 3 فروع ", description: "نسعى للتوسع قريبًا " },
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbItems} />
			<section className="section">
				<div className="container mx-auto mb-6 ">
					<div className="row  ">
						<div className="col-span-full mb-12">
							<span className="span_section"> اطلع على حقوقك والتزاماتك </span>
							<div className="flex items-center">
								<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
								<h2 className="py-[16px] h2_section">تعرف على شروط وأحكام استخدام الخدمة</h2>
							</div>
							<p className="p_section pt-[12px]">
								قبل البدء في استخدام خدماتنا، نرجو منك الاطلاع على شروط وأحكام الموقع بعناية لضمان فهمك الكامل لكافة الإجراءات المتعلقة بالطلب والدفع والخدمات المقدمة. التزامك بهذه الشروط يضمن لك
								تجربة مميزة.
							</p>
						</div>

						<div className="md:w-6/12">
							<div className="rtl:pl-4 ltr:pr-4 ">
								<div className="col-span-full mb-12">
									<span className="span_section"> ثلاثون عامًا من الخبرة والابتكار </span>
									<div className="flex items-center">
										<div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
										<h2 className="py-[16px] h2_section">خبرة وابتكار في عالم الطباعة والإعلان</h2>
									</div>
									<p className="p_section pt-[12px]">
										في وكالة فن المصممون، نرتقي بفن الطباعة والتغليف إلى مستوى جديد. ثلاثون عامًا من الإبداع والجودة، نقدم خدمات متكاملة تلبي احتياجات عملائنا بأفضل الحلول العصرية والابتكارية.
									</p>
								</div>
							</div>
						</div>

						<div className="md:w-6/12 relative ">
							<img src={"/assets/images/Maskgroup.png"} alt="image" className=" w-full h-full object-cover " />
						</div>
					</div>
				</div>

				{/* العنصر الذي لا يكون داخل الـ container */}
				<div className="w-full py-[32px] relative">
					{/* الصورة الخلفية */}
					<img src="/assets/images/aboutusImg.png" alt="image" className="w-full h-svh md:h-full object-fill md:object-cover" />

					{/* الحاوية النسبية لتحديد موقع الـ divs */}
					<div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center py-[80px] px-4 sm:px-8 md:p-[80px]">
						{/* العناصر باستخدام map */}
						{data.map((item, index) => (
							<div key={index} className="py-6 sm:py-8 bg-black bg-opacity-50 rounded-sm flex items-center justify-center flex-col gap-y-[16px] ">
								<h2 className="text-white text-[1.8rem] sm:text-[2.2rem] font-bold leading-[2.4rem] sm:leading-[3rem]">{item.title}</h2>
								<p className="text-white text-[1rem] sm:text-[1.2rem] font-normal leading-[1.2rem]">{item.description}</p>
							</div>
						))}
					</div>
				</div>

				<div className="container mx-auto mb-6">
					<div className="row">
						<div className="w-full block md:flex items-center gap-x-[40px] mb-[32px] ">
							<div className="md:w6/12 mb-4 ">
								<h2 className=" text-[16px] md:text-[20px] text-text-sub font-normal ">
									بدأت وكالة فن المصممون رحلتها في عام 1418 هـ، مستندة إلى رؤية واضحة لتقديم حلول طباعة وإعلان مبتكرة. بفضل الإصرار على الجودة والإبداع، أصبحت الوكالة رائدة في السوق، تخدم آلاف العملاء
									بحلول تفوق التوقعات.
								</h2>
							</div>
							<div className="md:w6/12">
								<h2 className=" text-[16px] md:text-[20px] text-text-sub font-normal ">
									تميزنا ينبع من إيماننا بالابتكار والتطور المستمر. على مدار ثلاثة عقود، كنا نستخدم أحدث التقنيات في الطباعة والتغليف، مما مكننا من تقديم خدمات متكاملة تلبي احتياجات السوق المتغيرة بكل
									احترافية.{" "}
								</h2>
							</div>
						</div>

						<div className="w-full block md:flex items-center gap-x-[32px] mb-[32px] ">
							<div className="md:w6/12 md:mb-0 mb-4 ">
								<h2 className=" text-[16px] md:text-[20px] text-text-sub font-normal ">
									بدأت وكالة فن المصممون رحلتها في عام 1418 هـ، مستندة إلى رؤية واضحة لتقديم حلول طباعة وإعلان مبتكرة. بفضل الإصرار على الجودة والإبداع، أصبحت الوكالة رائدة في السوق، تخدم آلاف العملاء
									بحلول تفوق التوقعات.
								</h2>
							</div>
							<div className="md:w6/12">
								<h2 className=" text-[16px] md:text-[20px] text-text-sub font-normal ">
									تميزنا ينبع من إيماننا بالابتكار والتطور المستمر. على مدار ثلاثة عقود، كنا نستخدم أحدث التقنيات في الطباعة والتغليف، مما مكننا من تقديم خدمات متكاملة تلبي احتياجات السوق المتغيرة بكل
									احترافية.{" "}
								</h2>
							</div>
						</div>

						{/* end section */}
						<div className="w-full block md:flex items-center gap-x-[32px] ">
							<div className="md:w6/12 mb-4 md:mb-0 relative group">
								<div className="card relative overflow-hidden ">
									<img src="/assets/images/aboutUs2.png" alt="image" className="w-full h-full object-cover" />

									<div className="absolute bottom-10 rtl:right-8 ltr:left-8 transition-all duration-1000 ease-in-out group-hover:opacity-0 group-hover:translate-y-[-20px]">
										<h2 className='relative text-[2rem] font-bold text-white after:content-[""] after:w-[52.885px] after:h-[4px] after:bg-[#F49100] after:absolute after:right-0 after:ltr:left-0 after:top-[110%]'>
											الرؤية
										</h2>
									</div>

									<div className="contentBox flex items-start justify-center flex-col rounded-[13px] gap-y-[32px] px-[26px] absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-black/80 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-1000 ease-in-out">
										<h2 className='relative text-[2rem] font-bold text-white after:content-[""] after:w-[52.885px] after:h-[4px] after:bg-[#F49100] after:absolute after:right-0 after:ltr:left-0 after:top-[110%]'>
											الرؤية
										</h2>
										<p className="text-white md:text-[1.2rem] text-[0.9rem]  font-normal leading-[1.5rem]">
											نسعى لأن نكون روّادًا في مجال الطباعة والتغليف، مقدمين حلولًا مبتكرة تعكس هوية العلامات التجارية وتساهم في تعزيز تميزها في السوق من خلال استخدام تقنيات حديثة وفريق عمل محترف.
										</p>
									</div>
								</div>
							</div>

							<div className="md:w6/12 mb-4 md:mb-0 relative group">
								<div className="card relative  overflow-hidden ">
									<img src="/assets/images/aboutUs3.png" alt="image" className="w-full h-full object-cover" />

									<div className="absolute bottom-10 rtl:right-8 ltr:left-8 transition-all duration-1000 ease-in-out group-hover:opacity-0 group-hover:translate-y-[-20px]">
										<h2 className='relative text-[2rem] font-bold text-white after:content-[""] after:w-[52.885px] after:h-[4px] after:bg-[#F49100] after:absolute after:right-0 after:ltr:left-0 after:top-[110%]'>
											الرسالة
										</h2>
									</div>

									{/* Layer with hover effect */}
									<div className="contentBox flex items-start justify-center flex-col rounded-[13px] gap-y-[32px] px-[26px] absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-black/80 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-1000 ease-in-out">
										<h2 className='relative text-[2rem] font-bold text-white after:content-[""] after:w-[52.885px] after:h-[4px] after:bg-[#F49100] after:absolute after:right-0 after:ltr:left-0 after:top-[110%]'>
											الرسالة
										</h2>
										<p className="text-white md:text-[1.2rem] text-[0.9rem] font-normal leading-[1.5rem]">
											رسالتنا في فن هي تقديم خدمات طباعة وتغليف متميزة تركز على الجودة والابتكار، لنساعد عملائنا على تحقيق التفوق في سوق الأعمال من خلال تصميمات تلبي احتياجاتهم وتعكس أصالة علاماتهم
											التجارية.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Page;
