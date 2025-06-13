import AuthHeader from "@/components/layout/components/AuthHeader/AuthHeader";
import Image from "next/image";
import React, { ReactNode, Suspense } from "react";

type AuthLayoutProps = {
	children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<>
			<Suspense fallback={<div>Loading header...</div>}>
				<AuthHeader />
				{/* rest of the login page */}
			</Suspense>
			<main className="signup h-screen bg-white ">
				<div className="flex flex-wrap h-full items-start">
					{/* الجانب الأيسر */}
					<div className="w-full md:w-4/12 h-[300px]  md:h-full relative">
						<Image fill src="/assets/images/fann.png" alt="fann" className=" object-cover " priority />
					</div>

					{/* الجانب الأيمن */}
					<div className="w-full md:w-8/12 py-6 px-4 md:py-8 md:px-8 md:h-full flex justify-center items-center ">{children}</div>
				</div>
			</main>
		</>
	);
};

export default AuthLayout;
