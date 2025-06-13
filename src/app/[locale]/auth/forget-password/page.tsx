import React from 'react'
import ForgetPasswordForm from './_components/forgetPassword-form'
import Link from 'next/link'


const Page = () => {
  return <>

    <section className='w-full' >

      <ForgetPasswordForm />

      <div className='pt-[1.2rem]' >
        <p className="text-[16px] font-[400] ">
          هل تذكرت كلمة السر؟
          <Link href="/auth/login" className=" text-normal text-[16px] font-[700] ">
            تسجيل الدخول
          </Link>
        </p>
      </div>

    </section>
  </>
}

export default Page