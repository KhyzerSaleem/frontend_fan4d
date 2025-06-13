import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-[#16476D] text-[#FFFFFF] shadow hover:bg-[#16476D]/90 dark:bg-[#E8EDF0] dark:text-[#16476D] dark:hover:bg-[#E8EDF0]/90",
        destructive:
          "bg-[#E92727] text-[#FFFFFF] shadow-sm hover:bg-[#E92727]/90 dark:bg-[#ECF9F5] dark:text-[#E8EDF0] dark:hover:bg-[#ECF9F5]/90",
        outline:
          "border border-[#EBEBEC] bg-transparent text-[#FFFFFF] shadow-sm hover:bg-[#EBEBEC]/80 hover:text-[#16476D] dark:border-[#EBEBEC] dark:bg-[#16476D] dark:hover:bg-[#16476D]/90 dark:hover:text-[#E8EDF0]",
        secondary:
          "bg-[#FDEEEE] text-[#FFFFFF] shadow-sm hover:bg-[#FDEEEE]/80 dark:bg-[#10B981] dark:text-[#E8EDF0] dark:hover:bg-[#10B981]/80",
        ghost:
          "text-[#FFFFFF] hover:bg-[#EBEBEC] hover:text-[#16476D] dark:hover:bg-[#16476D] dark:hover:text-[#E8EDF0]",
        link: "text-[#FFFFFF] underline-offset-4 hover:underline dark:text-[#E8EDF0]",
        transparent:
          "border-2 border-normal bg-transparent text-[#16476D] hover:bg-[#16476D]/10 dark:text-[#E8EDF0] dark:hover:bg-[#16476D]/10",
        primary: 
          "bg-[#F49100] text-[#FFFFFF] shadow hover:bg-[#F49100]/90 dark:bg-[#FFD8A1] dark:text-[#16476D] dark:hover:bg-[#FFD8A1]/90",
      },
      size: {
        default: "p-[16px] rounded-[4px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
