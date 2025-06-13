import { getTranslations } from "next-intl/server";
import React from "react";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
};

type OrderItem = {
  id: number;
  product: Product;
  quantity: number;
  price: number;
};

type Address = {
  id: number;
  title: string;
  city: string;
  area: string;
};

type OrderDetailsData = {
  id: number;
  order_number: string;
  sub_total: number;
  discount: number;
  total: number;
  status: "pending" | "in_progress" | "in_way" | "complete" | "cancelled";
  payment_method_text: string;
  items: OrderItem[];
  address: Address;
};

type OrderDetailsProps = {
  order: OrderDetailsData;
};



// const stepStatuses: Record<OrderDetailsData["status"], number> = {
//   pending: 0,
//   in_progress: 1,
//   in_way: 2,
//   complete: 3,
//   cancelled: -1,
// };

const OrderDetails: React.FC<OrderDetailsProps> = async ({ order }) => {

    const t = await getTranslations()

  if (!order) return <p>Loading...</p>;

  // const currentStep = stepStatuses[order.status] ?? -1;

  const statusLabels: Record<OrderDetailsData["status"], string> = {
    pending: t("pending"),
    in_progress: t("in_progress"),
    in_way: t("in_way"),
    complete: t("completed"),
    cancelled: t("cancelled"),
};

  // const steps = Object.keys(stepStatuses).map((status) => ({
  //   label: statusLabels[status as OrderDetailsData["status"]],
  // }));

  return (
    <div className="md:p-4">
      {/* خطوات الطلب */}
      {/* <ol className="flex flex-wrap items-center justify-between mb-4">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`relative flex items-center justify-center flex-1 ${
              index < currentStep
                ? "after:border-normal"
                : "after:border-gray-100"
            } after:content-[''] after:w-full after:h-1 after:border-b after:border-4`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                index <= currentStep ? "bg-normal" : "bg-gray-100"
              }`}
            >
              {step.label && index === 0 ? (
                <img src="/assets/icons/Check.svg" alt="icon" />
              ) : (
                index + 1
              )}
            </div>
            <h3 className="absolute top-full text-center text-[10px] md:text-[14px] font-normal text-text-main">
              {step.label}
            </h3>
          </li>
        ))}
      </ol> */}

      {/* معلومات الطلب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-[40px]">
        <div className="p-4 border border-text-borders rounded-md">
          <h2 className="text-[22px] font-bold text-text-main mb-[20px]">
            { t("Booking-details") }
          </h2>
          <h2 className="text-[25px] font-bold text-normal">
            #{order.order_number}
          </h2>
          <div className="px-3 py-1 bg-[#E8EDF0] rounded-full w-fit my-[20px]">
            <span className="text-[14px] font-normal text-normal">
              {statusLabels[order.status]}
            </span>
          </div>
          <div className="flex items-center gap-x-[12px]">
            <img src="/assets/icons/cards.svg" alt="icon" />
            <span className="text-[14px] font-normal text-normal">
              {order.payment_method_text}
            </span>
          </div>
        </div>

        <div className="p-4 border border-text-borders rounded-md">
          <h2 className="text-[22px] font-bold text-text-main mb-[20px]">
            { t("Delivery-information") }
          </h2>
          <div className="flex flex-col gap-y-[20px]">
            <div className="flex items-center gap-3">
              <img src="/assets/icons/location2.svg" alt="location" />
              <span className="text-[22px] text-text-sub">
                {order.address.city}، {order.address.area}
              </span>
            </div>
            <h2 className="text-[22px] font-normal text-text-sub">
              {order.address.title}
            </h2>
          </div>
        </div>

        <div className="p-4 border border-text-borders rounded-md">
          <h2 className="text-[22px] font-bold text-text-main mb-[20px]">
            { t("payment-details") }
          </h2>
          <div className="flex flex-col gap-y-[20px]">
            <div className="flex justify-between">
              <h3 className="text-[20px] text-text-sub"> {t("Subtotal")} </h3>
              <span className="text-[20px] font-bold text-text-main">
                {order.sub_total} { t("Saudi-Riyal") }
              </span>
            </div>
            <div className="flex justify-between border-b border-text-borders pb-2">
              <h3 className="text-[20px] text-text-sub"> { t("opponent") } </h3>
              <span className="text-[20px] font-bold text-accent-danger">
                -{order.discount} { t("Saudi-Riyal") }
              </span>
            </div>
            <div className="flex justify-between">
              <h3 className="text-[20px] text-text-sub">{ t("total") }</h3>
              <span className="text-[20px] font-bold text-text-main">
                {order.total} { t("Saudi-Riyal") }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* جدول المنتجات */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-text-borders">
          <thead>
            <tr className="bg-[#F2F2F2] rtl:text-right ltr:text-left ">
              <th className="p-4 text-[14px] font-normal text-text-main">
                { t("product") }
              </th>
              <th className="p-4 text-[14px] font-normal text-text-main">
              {t("Quantity")}
              </th>
              <th className="p-4 text-[14px] font-normal text-text-main">
              {t("price")}
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border-b border-text-borders flex items-center gap-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  {item.product.title}
                </td>
                <td className="p-4 border-b border-text-borders">
                  {item.quantity}
                </td>
                <td className="p-4 border-b border-text-borders">
                  {item.price} { t("Saudi-Riyal") }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
