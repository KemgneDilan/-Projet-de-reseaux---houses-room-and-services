"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, children, isLoading = false, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed"

  const variants = {
    default: "bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800",
    destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
    outline: "border border-blue-700 bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300",
    ghost: "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
    link: "text-blue-700 underline-offset-4 hover:underline hover:text-blue-800",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    subtle: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-lg px-8 text-base",
    xl: "h-14 rounded-lg px-10 text-lg",
    icon: "h-10 w-10",
    "icon-sm": "h-8 w-8 rounded-md",
  }

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)

  const content = isLoading ? (
    <>
      <span className="inline-block animate-spin mr-2">⏳</span>
      {children}
    </>
  ) : children

  if (asChild) {
    return (
      <button
        className={combinedClassName}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </button>
    )
  }

  return (
    <motion.button
      className={combinedClassName}
      ref={ref}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </motion.button>
  )
})
Button.displayName = "Button"

export { Button }
