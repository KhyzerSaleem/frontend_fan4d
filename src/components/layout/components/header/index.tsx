"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { AlignJustify, Brush, CreditCard, LogIn, MapPin, ShoppingBasket, User, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import ShoppingCarTDailog from "./components/shopping-cart-dailog";
import { useSession } from "next-auth/react";
import LogoutDailog from "./components/logout-dailog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import WishlistButton from "./components/WishlistButton";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const t = useTranslations();
	const locale = useLocale();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	// Navgation
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// variables
	// const searchQuery = new URLSearchParams(searchParams);

	// // functions
	// const swithLocale = (locale: 'en' | 'ar') => {
	//   router.push(`${pathname}?${searchQuery.toString()}`, { locale })
	// }

	const { data } = useSession();

	const [isOpen, setIsOpen] = useState<boolean>(false); // حالة التحكم في فتح الـ Dialog

	const handleSelectChange = (value: string) => {
		if (value === "logout") {
			setIsOpen(true);
		} else {
			// التنقل إلى الصفحة المختارة
			router.push(value);
		}
	};

	return (
		<section className="header ">
			{/* Header Top */}
			<div className="Header_Top  px-[1rem] lg:px-[5rem] py-[0.8rem] bg-normal flex justify-end items-center">
				{/* <div className="flex items-center gap-x-[0.8rem]">
          <img src="/assets/icons/TruckFast.svg" alt="icon" />

          <p className="text-[0.8rem] sm:text-[1rem] font-normal text-white">
            {t("Order-more")}
          </p>
        </div> */}
				<div className="flex items-center gap-x-[0.8rem] ">
					<img src="/assets/icons/languageSquare.svg" alt="icon" />
					<Link href={`${pathname}?${searchParams.toString()}`} locale={locale !== "ar" ? "ar" : "en"} className="text-[0.8rem] sm:text-[1rem] font-normal text-white">
						{t("language")}
					</Link>
				</div>
			</div>

			{/* Header Center */}

			<div className={`px-[1rem] lg:px-[5rem] py-[0.8rem] flex justify-between items-center border-b bg-white border-text-borders z-50 ${isScrolled ? "shadow-md fixed top-0  duration-500 py-[1rem] left-0 right-0 w-full" : ""}`}>
				<div className="">
					<Link href={"/"}>
						<Image src={"/assets/images/Logo.png"} alt="logo" width={93} height={24} className="object-cover" />
					</Link>
				</div>

				{/* <div className="w-5/12 hidden sm:block">
          <SearchInput />
        </div> */}

				<div className="ms-auto flex items-center justify-end gap-x-4 ">
					<WishlistButton />
					<ShoppingCarTDailog />

					<DropdownMenu>
						<DropdownMenuTrigger className="hidden md:flex items-center gap-x-2 cursor-pointer">
							<img src="/assets/icons/ProfileCircle.svg" alt="icon" />
							{data?.user?.name ? (
								<span className="text-[0.8rem] sm:text-[1rem] font-normal">
									{t("hello")} {data.user.name}
								</span>
							) : (
								<Link href="/auth/login" className="text-[0.8rem] sm:text-[1rem] font-normal">
									{t("Login")}
								</Link>
							)}
						</DropdownMenuTrigger>
						{data?.user?.name && (
							<DropdownMenuContent align="center">
								<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
									<Link href="/settings/profile-my-info" className="flex items-center gap-x-[6px]">
										<span className="text-[1rem] font-normal text-text-sub">{t("my-data")}</span>
										<User size={24} color="#C1C2C3" />
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
									<Link href="/settings/profile-locations" className="flex items-center gap-x-[6px]">
										<span className="text-[1rem] font-normal text-text-sub">{t("my-addresses")}</span>
										<MapPin size={24} color="#C1C2C3" />
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
									<Link href="/settings/my-orders" className="flex items-center gap-x-[6px]">
										<span className="text-[1rem] font-normal text-text-sub">{t("my-orders")}</span>
										<ShoppingBasket size={24} color="#C1C2C3" />
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
									<Link href="/settings/my-designs" className="flex items-center gap-x-[6px]">
										<span className="text-[1rem] font-normal text-text-sub">{t("special-pricing")}</span>
										<Brush size={24} color="#C1C2C3" />
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
									<Link href="/settings/payment" className="flex items-center gap-x-[6px]">
										<span className="text-[1rem] font-normal text-text-sub">{t("my-wallet")}</span>
										<CreditCard size={24} color="#C1C2C3" />
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSelectChange("logout")} className=" rtl:justify-end ltr:justify-start ">
									<div className="flex items-center !justify-end gap-x-[2px] cursor-pointer">
										<span className=" text-sm font-normal text-[#5A5D61]  ">{t("sign-out")}</span>
										<LogIn size={20} color="#C1C2C3" />
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						)}
					</DropdownMenu>

					<button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex items-center">
						<AlignJustify className="w-6 h-6 text-normal" />
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`fixed top-0 left-0 right-0 bottom-0  h-full  bg-opacity-75 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}>
				<div className="bg-white w-3/4 h-full absolute left-0 p-4">
					<button onClick={() => setMenuOpen(false)} className="text-black text-xl mb-4">
						<X className="w-6 h-6 text-normal" /> {/* أيقونة إغلاق */}
					</button>
					<nav className="flex flex-col gap-y-4">
						<Link href="/wishlist" className="text-[0.8rem]" onClick={() => setMenuOpen(false)}>
							{t("Favorites")}
						</Link>
						<Link href="/shopping-cart" className="text-[0.8rem]" onClick={() => setMenuOpen(false)}>
							{t("basket")}
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-x-2 cursor-pointer">
								<img src="/assets/icons/ProfileCircle.svg" alt="icon" />
								{data?.user?.name ? (
									<span className="text-[0.8rem] sm:text-[1rem] font-normal">
										{t("hello")} {data.user.name}
									</span>
								) : (
									<Link href="/auth/login" className="text-[0.8rem] sm:text-[1rem] font-normal">
										{t("Login")}
									</Link>
								)}
							</DropdownMenuTrigger>
							{data?.user?.name && (
								<DropdownMenuContent align="center">
									<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
										<Link href="/settings/profile-my-info" className="flex items-center gap-x-[6px]" onClick={() => setMenuOpen(false)}>
											<span className="text-[1rem] font-normal text-text-sub">{t("my-data")}</span>
											<User size={24} color="#C1C2C3" />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
										<Link href="/settings/profile-locations" className="flex items-center gap-x-[6px]" onClick={() => setMenuOpen(false)}>
											<span className="text-[1rem] font-normal text-text-sub">{t("my-addresses")}</span>
											<MapPin size={24} color="#C1C2C3" />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
										<Link href="/settings/my-orders" className="flex items-center gap-x-[6px]" onClick={() => setMenuOpen(false)}>
											<span className="text-[1rem] font-normal text-text-sub">{t("my-orders")}</span>
											<ShoppingBasket size={24} color="#C1C2C3" />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
										<Link href="/settings/my-designs" className="flex items-center gap-x-[6px]" onClick={() => setMenuOpen(false)}>
											<span className="text-[1rem] font-normal text-text-sub">{t("special-pricing")}</span>
											<Brush size={24} color="#C1C2C3" />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="rtl:justify-end ltr:justify-start ">
										<Link href="/settings/payment" className="flex items-center gap-x-[6px]" onClick={() => setMenuOpen(false)}>
											<span className="text-[1rem] font-normal text-text-sub">{t("my-wallet")}</span>
											<CreditCard size={24} color="#C1C2C3" />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleSelectChange("logout")} className=" rtl:justify-end ltr:justify-start ">
										<div className="flex items-center !justify-end gap-x-[2px] cursor-pointer" onClick={() => setMenuOpen(false)}>
											<span className=" text-sm font-normal text-[#5A5D61]  ">{t("sign-out")}</span>
											<LogIn size={20} color="#C1C2C3" />
										</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							)}
						</DropdownMenu>
					</nav>
				</div>
			</div>

			{/* Header Bottom */}
			<div className="Header_bottom  px-[1rem] lg:px-[5rem] py-[0.8rem]  flex-wrap justify-between items-center border-b border-text-borders hidden md:flex">
				<div className="w-full sm:w-6/12 flex items-center  justify-center md:justify-start gap-x-[1rem] mb-4 sm:mb-0">
					<Link href="/categories" className="text-[1rem]  font-normal">
						{t("Products-design")}
					</Link>

					{/* <Select name="category"
            onValueChange={(value) => { router.push(value) }} >
            <SelectTrigger className="border-none shadow-none w-1/2 md:w-3/12">
              <SelectValue placeholder={t("Products-design")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="/categories/all-products"
              >
                {t("Clothes-fabrics")}
              </SelectItem>
              <SelectItem
                value="/categories"
              >
                {t("Printing-Products")}
              </SelectItem>
            </SelectContent>
          </Select> */}

					<Link href="/categories/products-without-print" className="text-[1rem]  font-normal">
						{t("Non-printing-products")}
					</Link>
				</div>

				{/*         <div className="w-full sm:w-6/12 flex justify-center md:justify-end items-center gap-x-4">
          {data?.user ? (
            <>
              <Link href="/get-quote" className="flex items-center gap-x-2">
                <img src="/assets/icons/ReceiptItem.svg" alt="icon" />

                <span className="text-[1rem] font-normal">
                  {t("Get-quote")}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/direct-request"
                className="flex items-center gap-x-2"
              >
                <img src="/assets/icons/Receipt.svg" alt="icon" />

                <span className="text-[1rem] font-normal">
                  {t("Direct-request")}
                </span>
              </Link>
            </>
          )}
        </div> */}

				<div className="w-full sm:w-6/12 flex justify-center md:justify-end items-center gap-x-4">


				{data?.user?.name ? (
								<Link href="/get-quote" className="flex items-center gap-x-2">
								<img src="/assets/icons/ReceiptItem.svg" alt="icon" />
		
								<span className="text-[1rem] font-normal">{t("Get-quote")}</span>
							</Link>
							) : (
							""
							)}
				
					<Link href="/direct-request" className="flex items-center gap-x-2">
						<img src="/assets/icons/Receipt.svg" alt="icon" />

						<span className="text-[1rem] font-normal">{t("Direct-request")}</span>
					</Link>
				</div>
			</div>

			<LogoutDailog isOpen={isOpen} setIsOpen={setIsOpen} />
		</section>
	);
};

export default Header;
