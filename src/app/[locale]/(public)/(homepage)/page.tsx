import Hero from "./_components/hero";
import Designs from "./_components/design";
import Experts from "./_components/experts";
import Steps from "./_components/steps";
import Services from "./_components/services";
import Offers from "./_components/offers";
/* import Discounts from "./_components/discounts";*/
import Products from "./_components/products";
import Clients from "./_components/clients";

export default function Home() {
	return (
		<>
			<Hero />
			<Designs />
			<Experts />
			<Steps />
			<Services />
			<Offers />
			{/*    <Discounts /> */}
			<Products />
			{/* <SpecialDiscount /> */}
			<Clients />
		</>
	);
}
