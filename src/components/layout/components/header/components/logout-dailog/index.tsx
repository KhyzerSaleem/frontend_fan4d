"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void; // دالة لإغلاق الـ Dialog
};

const LogoutDailog = ({ isOpen, setIsOpen }: Props) => {
    const { toast } = useToast();

    const handleLogout = () => {
        toast({
            title: "تم تسجيل الخروج بنجاح",
            variant: "default",
        });
        setTimeout(() => {
            signOut({ callbackUrl: "/" });
        }, 1000);
        setIsOpen(false); // إغلاق الـ Dialog بعد الخروج
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div />
            </DialogTrigger>

            <DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
                <div className="flex flex-col justify-center items-center">
                <h3 className="text-[32px] font-bold text-text-main">هل أنت متأكد من تسجيل الخروج؟</h3>
        <div className='py-[20px]'>
            <p className='text-[20px] font-normal text-text-sub text-center'>
                سيتم تسجيل خروجك ولن تتمكن من الوصول إلا بعد تسجيل الدخول مرة أخرى.
            </p>
        </div>
                </div>

                <div className="block md:flex items-center justify-between w-full gap-x-[32px]">
                    <Button className="w-full md:mb-0 mb-5" variant={"destructive"} onClick={handleLogout}>
                        تسجيل الخروج
                    </Button>
                    <DialogTrigger asChild>
                        <Button className="w-full" variant={"transparent"}>
                            الغاء
                        </Button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutDailog;
