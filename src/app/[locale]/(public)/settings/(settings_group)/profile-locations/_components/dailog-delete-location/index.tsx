"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { deleteLocationAction } from "@/lib/actions/settings/addresses/store.action";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const DeleteLocationDailog = ({
  locationId,
  onDelete,
}: {
  locationId: number;
  onDelete: () => void;
}) => {

    
  const t = useTranslations();
  const { toast } = useToast();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLocationAction(id),
  });

  const handleDeleteLocationAction = async () => {
    const response = await mutateAsync(locationId);

    if (response.status === 200) {
      toast({
        title: t("location_deleted"),
        variant: "default",
      });
      onDelete(); // Call the onDelete prop to remove the location
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
        <Button
          variant={"ghost"}
          className="flex-2 p-[16px] rounded-sm cursor-pointer border border-text-borders hover:bg-[#16476D]/10"
        >
          <img src="/assets/icons/trash.svg" alt="icon" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[32px] font-bold text-text-main">
          {t("confirm_delete_location")}
          </h3>
        </div>

        <div className="block w-full gap-x-[32px]">
          <DialogTrigger asChild>
            <Button
              className="w-full mb-5"
              variant={"destructive"}
              onClick={handleDeleteLocationAction}
            >
              {isPending ? <Loader2 className="animate-spin mr-2" /> : ""}
              {t("delete_location")}
            </Button>
          </DialogTrigger>

          <DialogTrigger asChild>
            <Button className="w-full" variant={"transparent"}>
            {t("go_back")}
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};
