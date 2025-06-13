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
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import CancleOrderDailg from "../currentOrders-dailog/cancle-order";

// ✅ 1️⃣ تحديد نوع البيانات الخاصة بالطلبات
interface Order {
  id: string;
  order_number: string;
  quantity: number;
  total: string;
  status: "pending" | "in_progress" | "in_way" | "complete" | "cancelled";
  status_text: string;
}

// ✅ 2️⃣ تحديد نوع `orders` داخل `props`
interface CurrentOrdersProps {
  orders: Order[];
}

const CurrentOrders = ({ orders }: CurrentOrdersProps) => {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 1; // Change this dynamically if pagination is needed.

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-text-borders">
        <thead>
          <tr className="bg-[#F2F2F2] rtl:text-right ltr:text-left ">
            <th className="p-4 text-[14px] font-normal text-text-main">
              {t("order_number")}
            </th>
            <th className="p-4 text-[14px] font-normal text-text-main">
              {t("Quantity")}
            </th>
            <th className="p-4 text-[14px] font-normal text-text-main">
              {t("price")}
            </th>
            <th className="p-4 text-[14px] font-normal text-text-main">
              {t("status")}
            </th>
            <th className="p-4 text-[14px] font-normal text-text-main"></th>
            <th className="p-4 text-[14px] font-normal text-text-main"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-4 border-b border-text-borders">
                {order.order_number}
              </td>
              <td className="p-4 border-b border-text-borders">
                {order.quantity}
              </td>
              <td className="p-4 border-b border-text-borders">
                {order.total} { t("Saudi-Riyal") }
              </td>
              <td className="p-4 border-b border-text-borders text-center">
                <div
                  className={`rounded-[33px] py-[4px] px-3 
    ${
      order.status === "complete"
        ? "bg-[#E1FFDC] text-green-700" // أخضر للمكتمل
        : order.status === "pending"
        ? "bg-[#FFF4DC] text-yellow-700" // أصفر للمعلّق
        : order.status === "in_progress"
        ? "bg-[#DCEEFF] text-blue-700" // أزرق قيد التنفيذ
        : order.status === "in_way"
        ? "bg-[#FFE7D6] text-orange-700" // برتقالي في الطريق
        : "bg-[#FFE1E1] text-red-700" // أحمر للملغي
    }`}
                >
                  {t(order.status)}
                </div>
              </td>
              <td className="p-4 border-b border-text-borders text-[1rem] font-bold text-normal cursor-pointer text-end ">
                <Link href={`/settings/order-details-current/${order.id}`}>
                  {" "}
                  {t("view_order_details")}{" "}
                </Link>
              </td>
              <td className="p-4 border-b border-text-borders text-[1rem] font-bold text-normal cursor-pointer text-end flex justify-center">
                {/* <CurrentOrdersDailog /> */}
                <CancleOrderDailg id={order?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default CurrentOrders;
