import React from 'react'
import { fetchOrdersCurrent } from '@/lib/apis/my-orders'
import CurrentOrders from './current/_components/current-orders'

const Page = async () => {

  const orderCurrent = await fetchOrdersCurrent()
  
  return (
    <div>
        <CurrentOrders orders={orderCurrent?.data?.data || []} />
    </div>
  )
}

export default Page