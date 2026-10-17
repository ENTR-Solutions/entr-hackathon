import { Loader2 } from "lucide-react"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "font-poppins font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl focus:ring-primary/50",
        success: "bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl focus:ring-success/50",
        destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl focus:ring-destructive/50",
        secondary: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50",
        ghost: "text-foreground hover:bg-accent focus:ring-accent/50",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "py-2 px-4 text-sm rounded-md",
        md: "py-3 px-6",
        lg: "py-4 px-8 text-lg",
        default: "h-9 px-4 py-2",
        wide: "h-12 w-full px-8 py-3 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  needsConfirmation?: boolean
  confirmationTitle?: string
  confirmationMessage?: string
  confirmButtonText?: string
  cancelButtonText?: string
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      needsConfirmation = false,
      confirmationTitle,
      confirmationMessage,
      confirmButtonText,
      cancelButtonText,
      onClick,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
    const Comp = asChild ? Slot : "button"
    const isDisabled = loading || disabled

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (needsConfirmation) {
        event.preventDefault()
        event.stopPropagation()
        setIsConfirmOpen(true)
      } else if (onClick) {
        onClick(event)
      }
    }

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event)
      }
      setIsConfirmOpen(false)
    }

    const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18

    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")}
          ref={ref}
          disabled={isDisabled}
          {...props}
          onClick={handleButtonClick}
        >
          {asChild ? (
            children
          ) : (
            <>
              {loading && <Loader2 className="animate-spin" size={iconSize} />}
              {!loading && icon && iconPosition === "left" && icon}
              {children}
              {!loading && icon && iconPosition === "right" && icon}
            </>
          )}
        </Comp>

        {needsConfirmation && (
          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{confirmationTitle || "Are you sure?"}</DialogTitle>
                {confirmationMessage && (
                  <DialogDescription>{confirmationMessage}</DialogDescription>
                )}
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setIsConfirmOpen(false)}
                >
                  {cancelButtonText || "Cancel"}
                </Button>
                <Button onClick={handleConfirm} variant={variant === 'destructive' ? 'destructive' : 'primary'}>
                  {confirmButtonText || "Confirm"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
