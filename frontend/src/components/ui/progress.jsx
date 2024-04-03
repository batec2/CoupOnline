import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 overflow-hidden rounded-full bg-gradient-to-r to-cards-return from-cards-keep", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full flex-1 bg-secondary transition-all"
      style={{ transform: `translateX(${(value || 0)}%)` }} />
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
