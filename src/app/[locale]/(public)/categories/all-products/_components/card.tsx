"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Data {
  id: number;
  image: string;
  title: string;
  price: number;
}

type Props = {
  payload: Data[];
};

const Card = ({ payload }: Props) => {

  const t = useTranslations()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // حساب إجمالي الصفحات
  const totalPages = Math.ceil(payload.length / itemsPerPage);

  // استخراج البيانات الخاصة بالصفحة الحالية
  const currentData = payload.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-wrap items-center justify-center md:justify-start ">
        {/* عرض المنتجات بناءً على الصفحة الحالية */}
        {currentData.map((product) => (
          <div key={product.id} className="w-full md:w-4/12 relative">
            <div className="md:px-4 pb-[32px] relative">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full md:h-[228px] object-cover rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-y-[16px] py-[16px]">
                <h2 className="text-text-main text-[1.2rem] font-bold">
                  {product.price} { t("Saudi-Riyal") }
                </h2>
                <p className="text-text-sub text-[1.1rem] font-normal">
                  {product.title}
                </p>
              </div>
              <Link href={`/categories/all-products/${product.id}`} >
              <Button
                variant="transparent"
                className="w-full font-bold flex items-center"
              >
                <img src="/assets/icons/eye.svg" alt="icon" />
                { t("Product-Details") }
              </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 الـ Pagination */}
      {totalPages > 1 && (
        <div className="py-4">
          <Pagination>
            <PaginationContent>
              {/* الزر السابق */}
              <PaginationItem>
                <PaginationPrevious
                  className="!text-normal "
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* أزرار الصفحات */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                if (
                  page === 1 || // الصفحة الأولى
                  page === totalPages || // الصفحة الأخيرة
                  (page >= currentPage - 1 && page <= currentPage + 1) // الصفحات القريبة
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        className="!text-normal"
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
                  className="!text-normal"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Card;

{
  /* {product.discount && (
                                    <div className="absolute bottom-[1rem] rtl:right-[1rem] ltr:left-[1rem] px-[13.759px] py-[6.35px] bg-white flex flex-col items-center justify-center rounded-sm">
                                        <span className="text-accent-danger text-[1.2rem] font-bold">
                                            {product.discount}
                                        </span>
                                    </div>
                                )} */
}
