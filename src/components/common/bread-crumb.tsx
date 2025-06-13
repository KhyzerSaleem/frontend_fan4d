// src/components/common/Breadcrumb.tsx
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  items: Array<{
    href?: string;
    label?: string;
    isCurrentPage?: boolean;
    icon?: string;
  }>;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="relative  ">
      <img
        src="/assets/images/Breadcrumbs.png"
        alt="Breadcrumbs Background"
        className=" w-full h-[120px] flex justify-center items-center object-cover"
      />
      <div className=" absolute top-[50%] transform -translate-y-[50%] md:px-[80px] px-[16px]  z-10">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.icon && <img src={item.icon} alt="icon" className="ltr:mr-2 rtl:ml-2 " />}
                      <span aria-current="page" className="text-white">
                        {item.label}
                      </span>
                    </BreadcrumbLink>
                  ) : item.isCurrentPage ? (
                    <BreadcrumbPage>
                      <span aria-current="page" className="text-white">
                        {item.label}
                      </span>
                    </BreadcrumbPage>
                  ) : (
                    <span className="text-white" >{item.label}</span>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Breadcrumbs;
