import React from 'react'
import CurrentOrders from './_components/current-orders'
import { fetchOrdersCurrent } from '@/lib/apis/my-orders';

const Page = async () => {

  const orderCurrent = await fetchOrdersCurrent()
  


  return (
    <div>
        <CurrentOrders orders={orderCurrent?.data?.data || []} />
    </div>
  )
}

export default Page