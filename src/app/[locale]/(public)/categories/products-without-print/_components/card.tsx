"use client";
// import SearchInput from "@/components/custom/SearchInput";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Product = {
    id : number , 
    image: string , 
    title : string , 
    price :number , 
    description?: string
};

type CardProps = {
    products: Product[];
};

const Card = ({ products }: CardProps) => {

  const t = useTranslations()

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

//   const categories = [
//     {
//       id: 1,
//       image: "/assets/images/categories.png",
//       title: "120 ريال سعودي",
//       buttonText: "أضف إلى السلة",
//       discount: "خصم 10%",
//     },
//     {
//       id: 2,
//       image: "/assets/images/categories.png",
//       title: "تصاميم ورقية",
//       buttonText: "أضف إلى السلة",
//       discount: null,
//     },
//     {
//       id: 3,
//       image: "/assets/images/categories.png",
//       title: "التغليف المبتكر",
//       buttonText: "أضف إلى السلة",
//       discount: "خصم 20%",
//     },
//     {
//       id: 4,
//       image: "/assets/images/categories.png",
//       title: "التغليف المبتكر",
//       buttonText: "أضف إلى السلة",
//       discount: "خصم 20%",
//     },
//     {
//       id: 5,
//       image: "/assets/images/categories.png",
//       title: "التغليف المبتكر",
//       buttonText: "أضف إلى السلة",
//     },
//     // باقي العناصر...
//   ];

  return (
    <div>
      <div className=" block md:flex justify-between items-center   md:mb-[50px]   ">
        {/* <div className="md:w-3/12 w-full ">
          <Select name="country">
            <SelectTrigger className="h-[48px]">
              <SelectValue placeholder=" الأحدث " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="egypt"> الأقدم </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        {/* <div className="md:w-6/12 w-full py-[10px] md:py-0 ">
          <SearchInput />
        </div>
        <div>
          <span className="text-text-sub"> تم العثور على 52 نتيجة </span>
        </div> */}
      </div>
      <div className="w-full flex  flex-wrap items-center ">
        {/* Dynamically render categories */}
        {products.map((product: product) => (
          <div key={product.id} className="w-full md:w-4/12 relative">
            <div className="md:px-4 pb-[32px] relative">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full md:h-[228px] object-cover rounded-sm"
                />
                {/* {product.discount && (
                                    <div className="absolute bottom-[1rem] rtl:right-[1rem] ltr:left-[1rem] px-[13.759px] py-[6.35px] bg-white flex flex-col items-center justify-center rounded-sm">
                                        <span className="text-accent-danger text-[1.2rem] font-bold">
                                            {product.discount}
                                        </span>
                                    </div>
                                )} */}
              </div>
              <div className="flex flex-col gap-y-[16px] py-[16px]">
                <h2 className="text-text-main text-[1.2rem] font-bold">
                  {product.title}
                </h2>
                <p className="text-text-sub text-[1.1rem] font-normal">
                  { product?.price } { t("Saudi-Riyal") }
                </p>
              </div>
              <Link href={`/categories/all-products/${product?.id}`}>
                <Button
                  variant="transparent"
                  className="w-full font-bold flex items-center"
                >
                  <img src="/assets/icons/Bag.svg" alt="icon" />
                  { t("Product-Details") }
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="py-4">
        <Pagination>
          <PaginationContent>
            {/* الزر السابق */}
            <PaginationItem>
              <PaginationPrevious
                className="!text-normal "
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {/* الصفحات */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              if (
                page === 1 || // الصفحة الأولى
                page === totalPages || // الصفحة الأخيرة
                (page >= currentPage - 1 && page <= currentPage + 1) // الصفحات القريبة
              ) {
                return (
                  <PaginationItem className="" key={page}>
                    <PaginationLink
                      className="!text-normal "
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            {/* الزر التالي */}
            <PaginationItem>
              <PaginationNext
                className="!text-normal "
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Card;
