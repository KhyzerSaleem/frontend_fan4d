import React from 'react'
import TablesOrders from './_components/table-orders'
import { fetchOrdersPrevious } from '@/lib/apis/my-orders-previous'

const Page = async () => {

  const orderPrevious = await fetchOrdersPrevious()
  

  return (
    <div>
        <TablesOrders orders={orderPrevious?.data?.data || []} />
    </div>
  )
}

export default Page