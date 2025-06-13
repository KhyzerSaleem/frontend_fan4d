"use client"
import FeedbackMessage from '@/components/common/feedback-message'
import PasswordInput from '@/components/custom/PasswordInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'


const LoginForm = () => {

  // Translations
  // const t = useTranslations()

    // state
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

  const { toast } = useToast()

  const Schema = z.object({
    email: z.string({ required_error: "email is required" }).min(1, "email is required"),
    password: z.string({ required_error: "password is required" }).min(1, "password is required"),
    remember: z.boolean().optional(),
  })

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
    resolver: zodResolver(Schema)
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {

    // state
    setError(null)
    setLoading(true)

    
    

    const response = await signIn( 'credentials' , {
      ...values , 
      redirect: false
    })

    setLoading( false )

    // condetions
    if ( response?.ok ) {
      //  router.replace( response.url || '/dashboard' )
       toast({
         title: "تم بنجاح.",
         description: "تم التسجيل بنجاح.",
         variant: "default"
       })
       setTimeout(() => {
         window.location.href = response.url || '/'
       }, 1000);
    }

    setError( response?.error || "" )

  }


  return (

    <Form {...form} >

      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-y-[20px] ' >

        <div className="flex flex-col space-y-4 pt-[40px] ">

          {/* email */}
          <div className="flex flex-col space-y-1.5">

            <FormField
              name="email"
              control={form.control}
              render={({ field }) =>

                <FormItem>

                  {/* custom Label */}
                  <Label htmlFor="email">البريد الإلكترونى</Label>

                  {/* custom input */}
                  <Input
                    {...field}
                    placeholder="example@gmail.com"
                  />

                  {/* feedback */}
                  <FormMessage />

                </FormItem>

              }
            />
          </div>

          {/* PasswordInput */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>

                {/* custom input */}
                <PasswordInput
                  id="login-password"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  label="كلمة المرور"
                />

                {/* feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex  justify-between w-full space-y-1.5 ">
            <FormField
              name="remember"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-[6px] items-center">
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="remember">تذكرني</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div> <Link className='text-[1rem] font-fold text-normal ' href={'/auth/forget-password'} > نسيت كلمة السر؟ </Link> </div>
          </div>

        </div>


        <div className='flex flex-col items-center justify-center w-full gap-y-2 ' >

          {error && <FeedbackMessage> {error} </FeedbackMessage>}

          <Button
            disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}
            className="text-[16px] font-[700] w-full " variant="default" size="default">
            تسجيل جديد
          </Button>

        </div>

      </form>

    </Form>

  )
}

export default LoginForm