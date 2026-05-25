import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4"
      onClick={() => onOpenChange(false)}
    >
      <div className="w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 border border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-xl font-semibold text-slate-950", className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-600", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-6 flex flex-wrap gap-3 justify-end", className)} {...props} />
}
