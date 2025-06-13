"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { deleteAccountAction } from "@/lib/actions/settings/profile.action";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const ProfileDailog = () => {
  const t = useTranslations();

  const { toast } = useToast();

  // Mutation
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteAccountAction(),
  });

  const handleDeleteAccountAction = async () => {
    const response = await mutateAsync();

    if (response.status === 200) {
      toast({
        title: t("account_deleted_successfully"),
        variant: "default",
      });
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 1000);
    } else {
      toast({
        title: response?.message || t("error_occurred"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"transparent"} className="md:w-1/2 w-full ">
          {" "}
          {t("delete_account")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl  bg-white rounded-md shadow-md p-6">
        <div className="">
          <div className="flex flex-col justify-center items-center ">
            <h3 className="text-[32px] font-bold text-text-main ">
              {" "}
              {t("confirm_delete_account")}{" "}
            </h3>
            <div className="py-[20px]">
              <p className="text-[20px] font-normal text-text-sub  text-center">
                {t("delete_account_warning")}
              </p>
            </div>
          </div>
        </div>

        <div className="block w-full gap-x-[32px]">
          <Button
            className=" w-full mb-5   "
            variant={"destructive"}
            onClick={handleDeleteAccountAction}
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
            {t("delete_account")}
          </Button>

          <DialogTrigger asChild>
            <Button className=" w-full " variant={"transparent"}>
              {" "}
              {t("go_back")}{" "}
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDailog;
