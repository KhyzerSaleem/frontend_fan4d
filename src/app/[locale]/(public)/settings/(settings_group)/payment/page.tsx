import React from 'react'
import RechargeBalance from './_components/recharge-balance'
import CreditCard from './_components/credit-card'
import { fetchPointsTransactions } from '@/lib/apis/points-transactions'

const Page = async () => {
  const pointsData = await fetchPointsTransactions();
  const points = pointsData?.data || {}; // Pass the whole `data` object

  return (
    <div className="flex flex-col gap-y-[2rem]">
      <RechargeBalance points={points?.points || 0} money={points?.money || 0} />
      <CreditCard points={points} /> {/* Pass full `points` object */}
    </div>
  );
};

export default Page;

