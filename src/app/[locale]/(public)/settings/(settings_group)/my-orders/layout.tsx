import React from 'react'
import NavigationLinks from './_components/NavigationLinks';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <div className=' ' >

        {/* <div className='flex items-center justify-center md:justify-start gap-x-[24px] my-[32px] ' > */}
          {/* <Link href={'/settings/my-orders/current'} > الطلبات الحالية </Link>
          <Link href={'/settings/my-orders/previous'} > الطلبات السابقة </Link> */}
          <NavigationLinks />
        {/* </div> */}

        <div>
          {children}
        </div>

      </div>
    </>
  )
}

