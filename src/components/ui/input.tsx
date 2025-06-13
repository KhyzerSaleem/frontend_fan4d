import * as React from "react"

import { cn } from "@/lib/utils/cn"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-text-borders bg-transparent px-[12px] py-[16px] text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium  placeholder:text-text-sub focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-[16px] dark:border-neutral-800  dark:focus-visible:ring-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
