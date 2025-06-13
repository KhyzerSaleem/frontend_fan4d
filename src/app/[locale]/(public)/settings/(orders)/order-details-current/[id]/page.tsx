import React from 'react'
import { fetchOrdersDetails } from '@/lib/apis/my-orders-details'
import OrderDetails from '../_components/order-details'
import { getTranslations } from 'next-intl/server';


type PageProps = {
    params: { id: string };
  };
  
  const Page = async ({ params: { id } }: PageProps) => {
    
    const t = await getTranslations()
    const OrderDetailsData = await fetchOrdersDetails(id)

    

    return (
        <section className='section' >
            <div className="container mx-auto ">
                <div className="col-span-full mb-12">
                    <span className="span_section"> {t("current-order")} </span>
                    <div className="flex items-center">
                        <div className="line ltr:mr-[20px] rtl:ml-[20px]"></div>
                        <h2 className="py-[16px] h2_section">
                           { t("current-order-details") }
                        </h2>
                    </div>
                    <p className="p_section pt-[12px]">
                        { t("current-order-such") }
                    </p>
                </div>

                <div className="row  ">
                    <div className=' w-full ' >
                        <OrderDetails order={OrderDetailsData?.data} />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Page