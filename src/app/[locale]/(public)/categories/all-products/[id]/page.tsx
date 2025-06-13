import Breadcrumbs from "@/components/common/bread-crumb";
import React from "react";
import ContactForm from "./_components/contact-form";
import ImagesProduct from "./_components/images-product";
import { fetchProducts } from "@/lib/apis/products-details";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: { id: string };
};

const Page = async ({ params: { id } }: PageProps) => {

  const t = await getTranslations()
  const product = await fetchProducts(id);

  
  

  if (!product) {
    return <p>حدث خطأ أثناء جلب بيانات المنتج.</p>;
  }

  const breadcrumbItems = [
    { href: "/", icon: "/assets/icons/home.svg" },
    { label: t("Categories") },
    // { label: t("products") },
    { label: product?.data?.product?.title },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <section className="section">
        <div className="container mx-auto">
   
          <div className=" flex flex-wrap items-end ">
            <div className="w-full md:w-6/12">
              <div className="md:pl-6">
                <div>
                  <ContactForm product={product?.data?.product} />
                </div>
              </div>
            </div>

            <div className="w-full md:w-6/12">
              <ImagesProduct images={product?.data?.product?.image} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
