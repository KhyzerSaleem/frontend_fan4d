"use client"
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { forgetPasswordAction, forgetPasswordVerifyAction, updatePasswordVerifyAction } from '@/lib/actions/auth.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import PasswordInput from '@/components/custom/PasswordInput'


const ForgetPasswordForm = () => {

  // const t = useTranslations()
  const { toast } = useToast()
  const [step, setStep] = useState(1) // التحكم بالخطوة الحالية

  // Mutation
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (values: forgetPasswordFields) => forgetPasswordAction(values)
  })

  const Schema = z.object({
    phone: z.string({ required_error: "phone is required" }).min(1, "phone is required"),
  })

  const VerifySchema = z.object({
    code: z.string().length(5, "The OTP must be 5 digits long"),
  })

  const setpasswordSchema = z.object({
    password: z.string({ required_error: "password is required" }).min(1, "password is required"),
    password_confirmation: z.string({ required_error: "password_confirmation is required" }).min(1, "password_confirmation is required")
  })

  type Inputs = z.infer<typeof Schema>;
  type VerifyInputs = z.infer<typeof VerifySchema>
  type setpasswordInputs = z.infer<typeof setpasswordSchema>


  const forgetPasswordform = useForm<Inputs>({
    defaultValues: {
      phone: '',
    },
    resolver: zodResolver(Schema)
  });

  const verifyForm = useForm<VerifyInputs>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(VerifySchema)
  })

  const updatePasswordform = useForm<setpasswordInputs>({
    defaultValues: {
      password: '',
      password_confirmation: ''
    },
    resolver: zodResolver(setpasswordSchema)
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {

    

    const response = await mutateAsync(values)

    // condetions
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
      const response = await forgetPasswordVerifyAction({
        ...forgetPasswordform.getValues(), // Include the registration values (like name, email, etc.)
        code: values.code,          // Add the OTP code
      });

      if (response.status === 200) {
        toast({
          title: 'تم التحقق بنجاح',
          description: 'تم التحقق من رمز OTP بنجاح.',
          variant: 'default',
        });
        setStep(3) // الانتقال إلى خطوة التحقق
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

  const handleSetPassword: SubmitHandler<setpasswordInputs> = async (values) => {
    try {
      // Call verifyAction with the required fields
    
      
      const response = await updatePasswordVerifyAction({
        ...forgetPasswordform.getValues(), // Include the registration values (like name, email, etc.)
        ...verifyForm.getValues(),
        password: values.password,
        password_confirmation: values.password_confirmation
      });

      if (response.status === 200) {
        toast({
          title: 'تم التغير بنجاح',
          description: 'تم تغير كلمه المرور بنجاح.',
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
        <Form {...forgetPasswordform}  >

          <form onSubmit={forgetPasswordform.handleSubmit(onSubmit)} className='w-full flex flex-col gap-y-[20px] ' >

            <div className='flex flex-col gap-y-[12px]' >
              <h2 className=' text-[28px] font-[700] ' > نسيت كلمة المرور </h2>
              <p className=' text-[18px] font-[400] leading-[26px]" ' >  من فضلك أدخل رقم هاتفك المسجل بحسابك حتي تستطيع إنشاء رقم <br /> سرى جديد. </p>
            </div>

            <div className="flex flex-col space-y-4 pt-[40px] ">

              <div className="flex flex-col space-y-1.5 ">
                <FormField
                  name="phone"
                  control={forgetPasswordform.control}
                  render={({ field }) =>

                    <FormItem>

                      {/* custom Label */}
                      <Label htmlFor="phone">رقم الهاتف</Label>

                      {/* custom input */}
                      <Input
                        {...field}
                        placeholder="1234567890"
                        type='number'
                      />

                      {/* feedback */}
                      <FormMessage />

                    </FormItem>

                  }
                />
              </div>


            </div>

            <Button className="text-[16px] font-[700] " variant="default" size="default">
              ارسل
            </Button>

          </form>

        </Form>

      )}

      {step === 2 && (
        <Form {...verifyForm}>
          <form onSubmit={verifyForm.handleSubmit(handleVerify)} className='flex flex-col gap-y-[20px]'>

            <div className='flex flex-col gap-y-[12px]' >
              <h2 className=' text-[28px] font-[700] ' > تحقق </h2>
              <p className=' text-[18px] font-[400] leading-[26px]" ' >  لقد قمنا بإرسال رمز التحقق إلى الرقم 966123456789+ لتعديل بيانات حسابك الشخصي  </p>
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

      {step === 3 && (
        <Form {...updatePasswordform}  >

          <form onSubmit={updatePasswordform.handleSubmit(handleSetPassword)} className='w-full flex flex-col gap-y-[20px] ' >

          <div className='flex flex-col gap-y-[12px]' >
              <h2 className=' text-[28px] font-[700] ' > كلمة المرور الجديدة </h2>
              <p className=' text-[18px] font-[400] leading-[26px]" ' >  أدخل كلمة المرور الجديدة الخاصة بك، حيث تتكون على الأقل من 8 حروف. </p>
            </div>

            <div className="flex flex-col space-y-4 pt-[40px] ">

              {/* PasswordInput */}
              <FormField
                name="password"
                control={updatePasswordform.control}
                render={({ field }) => (
                  <FormItem>

                    {/* custom input */}
                    <PasswordInput
                      id="password"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      label=" كلمة المرور  "
                    />

                    {/* feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-1.5">
                {/* PasswordInput */}
                <FormField
                  name="password_confirmation"
                  control={updatePasswordform.control}
                  render={({ field }) => (
                    <FormItem>

                      {/* custom input */}
                      <PasswordInput
                        id="password_confirmation"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        label=" كلمة المرور  "
                      />

                      {/* feedback */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


            </div>


            <Button disabled={isPending} className="text-[16px] font-[700] " variant="default" size="default">
              تغيير كلمة المرور
            </Button>



          </form>

        </Form>
      )}

    </div>
  )
}

export default ForgetPasswordForm