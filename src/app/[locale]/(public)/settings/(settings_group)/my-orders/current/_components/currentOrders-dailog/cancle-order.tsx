"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cancleOrder } from "@/lib/actions/settings/order-cancle";

interface CancleOrderDailgProps {
  id: string; // id يتم تمريره كـ string ولكن سنحوله إلى number
}

const CancleOrderDailg: React.FC<CancleOrderDailgProps> = ({ id }) => {
  const t = useTranslations();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => cancleOrder(Number(id)), // تحويل id إلى number عند تمريره
    onSuccess: () => {
      toast({
        title: t("Deleted-successfully"),
        description: t("Deleted-successfully"),
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: t("error_description"),
        description: t("error_description"),
        variant: "destructive",
      });
      console.error("Error removing item:", error);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-[32px] py-[16px] bg-accent-danger-light text-accent-danger w-fit rounded-sm cursor-pointer">
          {t("Cancel-order")}
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[32px] font-bold text-text-main">
            {t("confirm_delete_order")}
          </h3>
        </div>

        <div className="block w-full gap-x-[32px]">
          <Button
            className="w-full mb-5"
            variant="destructive"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
            {t("Cancel-order")}
          </Button>

          <DialogTrigger asChild>
            <Button className="w-full" variant="transparent">
              {t("go_back")}
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancleOrderDailg;
