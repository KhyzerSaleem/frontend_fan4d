
import React from 'react'
import ContactForm from './_components/contact-form'
import { getTranslations } from 'next-intl/server'

const Page = async () => {

  const t = await getTranslations()

  return (
    <>
        <div className='py-[12px] px-[24px] border border-text-borders rounded-sm flex flex-col gap-y-[24px] ' >

            <h2 className='text-[25px] font-bold text-text-main  ' > {t("my-data")} </h2>

            <div>
                <ContactForm />
            </div>

        </div>
    </>
  )
}

export default Page