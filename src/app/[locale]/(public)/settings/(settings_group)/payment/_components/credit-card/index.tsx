"use client";
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
import { useTranslations } from "next-intl";

// Define the type for transaction data
interface Transaction {
  id: number;
  order_number: string | null;
  points: number;
  type: string;
  money: number;
  created_at: string;
}

// Define the type for points data
interface PointsData {
  points: number;
  money: number;
  transactions: {
    data: Transaction[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      last_page: number;
    };
  };
}

const CreditCard = ({ points }: { points: PointsData }) => {

  const t = useTranslations()

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = points?.transactions?.meta?.last_page || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="md:text-[1.5rem] text-[1rem] font-bold text-normal ">
            { t("points.score") }
          </h2>
        </div>
        {points.transactions?.data.map((transaction) => (
          <div
            key={transaction?.id}
            className="p-[12px] rounded-md shadow-sm border border-text-borders flex items-center justify-between"
          >
            <div className="flex items-start gap-x-[16px]">
              <div className="p-[6px] flex items-center justify-center bg-light-active rounded-sm">
                <img src="/assets/icons/money-send.svg" alt="icon" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[1rem] font-bold text-text-main">
                  {transaction?.order_number || "رقم غير متوفر"}
                </h3>
                <p className="text-[14px] font-normal text-text-sub">
                  {transaction?.created_at}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[18px] font-bold text-accent-success">
                +{transaction?.points} { t("points.points") }
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="!text-normal"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
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

            <PaginationItem>
              <PaginationNext
                className="!text-normal"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default CreditCard;
