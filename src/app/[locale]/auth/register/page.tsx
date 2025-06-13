import React from 'react'
import RegisterForm from './_components/register-form'
import { Link } from '@/i18n/routing'


const Page = () => {
  return <>

    <section className='w-full' >

      <RegisterForm />
      <p className="text-[16px] font-[400] mt-5 ">
        لديك حساب بالفعل؟{' '}
        <Link href="/auth/login" className=" text-normal text-[17px] font-[800] ms-1">
          تسجيل الدخول
        </Link>
      </p>
    </section>

  </>
}

export default Page