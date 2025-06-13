import React from 'react'
import LoginForm from './_components/login-form'
import Link from 'next/link'


const Page = () => {
  return (

    <section className='w-full' >

      <div className='flex flex-col gap-y-[12px]' >
        <h2 className=' text-[28px] font-[700] text-text-main ' > مرحبا مجددا! تسجيل الدخول </h2>
        <p className=' text-[18px] font-[400] leading-[26px]" ' > قم بتسجيل الدخول للإستمتاع بخدمات طباعة وتغليف منتجات بأعلى مستوى من الجودة <br /> والفعالية.  </p>
      </div>


      <LoginForm />
      <p className="text-[16px] font-[400] mt-5 ">  ليس لديك حساب؟ <Link href="/auth/register" className=" text-normal text-[16px] font-[800] ms-1">
         أنشيء حساب 
        </Link>
      </p>
    </section>

  )
}

export default Page