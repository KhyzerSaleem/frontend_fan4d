"use client"

import PasswordInput from '@/components/custom/PasswordInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { registerAction, verifyAction } from '@/lib/actions/auth.action'
import { useMutation } from '@tanstack/react-query'
import FeedbackMessage from '@/components/common/feedback-message'
import CitySelectField from './city-select-field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'



const RegisterForm = () => {

  // const t = useTranslations()
  const { toast } = useToast()
  const [step, setStep] = useState(1) // التحكم بالخطوة الحالية

  // Mutation
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: (values: RegisterFields) => registerAction(values)
  })

  // Schema
  const RegisterSchema = z.object({
    name: z.string({ required_error: "name is required" }).min(1, "name is required"),
    email: z.string({ required_error: "email is required" }).min(1, "email is required"),
    password: z.string({ required_error: "password is required" }).min(1, "password is required"),
    phone: z.string({ required_error: "phone is required" }).min(1, "phone is required"),
    city_id: z.string().default(""), // Ensure city_id is always a string
    remember: z.boolean().optional(),
  })

  const VerifySchema = z.object({
    code: z.string().length(5, "The OTP must be 5 digits long"),
  })

  type RegisterInputs = z.infer<typeof RegisterSchema>
  type VerifyInputs = z.infer<typeof VerifySchema>

  const registerForm = useForm<RegisterInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      city_id: '', // Default value ensures city_id is always a string
      remember: true,
    },
    resolver: zodResolver(RegisterSchema)
  })

  const verifyForm = useForm<VerifyInputs>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(VerifySchema)
  })

  // Handle Register
  const handleRegister: SubmitHandler<RegisterInputs> = async (values) => {
    const response = await mutateAsync(values)

    if (response.status === 200) {
      toast({
        title: "تم التسجيل بنجاح",
        description: "تم إرسال رمز التحقق إلى هاتفك.",
        variant: "default"
      })
      setStep(2) // الانتقال إلى خطوة التحقق
    } else {
      toast({
        title: "خطأ في التسجيل",
        description: response?.message || "حدث خطأ غير متوقع.",
        variant: "destructive",
      })
    }
  }

  // Handle Verify Code
  // Handle Verify Code
  const handleVerify: SubmitHandler<VerifyInputs> = async (values) => {
    try {
      // Call verifyAction with the required fields
      const response = await verifyAction({
        ...registerForm.getValues(), // Include the registration values (like name, email, etc.)
        code: values.code,          // Add the OTP code
      });

      if (response.status === 200) {
        toast({
          title: 'تم التحقق بنجاح',
          description: 'تم التحقق من رمز OTP بنجاح.',
          variant: 'default',
        });
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1000);
      } else {
        toast({
          title: 'خطأ في التحقق',
          description: response?.message || 'حدث خطأ غير متوقع أثناء التحقق.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'خطأ في الاتصال',
        description: `فشل الاتصال بالسيرفر. ${error}  ` ,
        variant: 'destructive',
      });
    }
  };



  return (

    <div className="w-full flex flex-col gap-y-[20px]">

      {step === 1 && (
        <Form {...registerForm}  >

          <form onSubmit={registerForm.handleSubmit(handleRegister)} className='w-full flex flex-col gap-y-[20px]  ' >

            <div className='flex flex-col gap-y-[12px]' >
              <h2 className=' text-[28px] font-[700] ' > إنشاء حساب جديد </h2>
              <p className=' text-[18px] font-[400] leading-[26px]" ' >قم بتسجيل حساب جديد و للإستمتاع بخدمات طباعة وتغليف منتجات بأعلى مستوى من  <br />الجودة  والفعالية. </p>
            </div>

            <div className="flex flex-col space-y-4 pt-[40px] ">

              {/* username */}
              <div className="flex flex-col space-y-1.5">
                <FormField
                  name="name"
                  control={registerForm.control}
                  render={({ field }) =>

                    <FormItem>

                      {/* custom Label */}
                      <Label htmlFor="name"> الاسم </Label>

                      {/* custom input */}
                      <Input
                        {...field}
                        // placeholder="محمد رضا"
                      />

                      {/* feedback */}
                      <FormMessage />

                    </FormItem>

                  }
                />
              </div>

              {/* email */}
              <div className="flex flex-col space-y-1.5">

                <FormField
                  name="email"
                  control={registerForm.control}
                  render={({ field }) =>

                    <FormItem>

                      {/* custom Label */}
                      <Label htmlFor="email">البريد الإلكترونى</Label>

                      {/* custom input */}
                      <Input
                        {...field}
                        // placeholder="example@gmail.com"
                      />

                      {/* feedback */}
                      <FormMessage />

                    </FormItem>

                  }
                />
              </div>

              {/* Select country && phone */}
              <div className="flex gap-x-[16px] ">
                <div className="flex flex-col space-y-1.5 w-1/2">

                  <CitySelectField control={registerForm.control} />

                </div>

                <div className="flex flex-col space-y-1.5 w-1/2">
                  <FormField
                    name="phone"
                    control={registerForm.control}
                    render={({ field }) =>

                      <FormItem>

                        {/* custom Label */}
                        <Label htmlFor="phone">رقم الهاتف</Label>

                        {/* custom input */}
                        <Input
                          {...field}
                          // placeholder="1234567890"
                          type='number'
                        />

                        {/* feedback */}
                        <FormMessage />

                      </FormItem>

                    }
                  />
                </div>


              </div>

              {/* PasswordInput */}
              <FormField
                name="password"
                control={registerForm.control}
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

              <div className="flex flex-col space-y-1.5 w-1/2">
                <FormField
                  name="remember"
                  control={registerForm.control}
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
              </div>


            </div>

            <div className='flex flex-col items-center justify-center w-full gap-y-2 ' >

              {error && <FeedbackMessage> {error?.message} </FeedbackMessage>}

              <Button
                disabled={isPending || (registerForm.formState.isSubmitted && !registerForm.formState.isValid)}
                className="text-[16px] font-[700] w-full " variant="default" size="default">
                تسجيل جديد
              </Button>

            </div>

          </form>

        </Form>
      )}

      {step === 2 && (
        <Form {...verifyForm}>
          <form onSubmit={verifyForm.handleSubmit(handleVerify)} className='flex flex-col gap-y-[20px]'>

            <div className='flex flex-col gap-y-[12px]' >
              
              <h2 className=' text-[28px] font-[700] ' > رمز التفعيل </h2>
              <p className=' text-[18px] font-[400] leading-[26px]" ' > لقد قمنا بإرسال رمز التفعيل إلى الرقم 966123456789+ لتأكيد بيانات حسابك الشخصي </p>
            </div>

            <div className="flex flex-col justify-center items-center space-y-4 pt-[40px]">
              <FormField
                name="code"
                control={verifyForm.control}
                render={({ field }) => (
                  <FormItem>
                    <InputOTPGroup>
                      <InputOTP className="text-center" maxLength={5} {...field}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTP>
                    </InputOTPGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} className="text-[16px] font-[700]">
              ارسل
            </Button>
          </form>
        </Form>
      )}

    </div>

  )
}

export default RegisterForm