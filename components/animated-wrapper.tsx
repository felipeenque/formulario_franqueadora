"use client"

import type React from "react"

import { motion, type Variants } from "framer-motion"

interface AnimatedWrapperProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedWrapper({ children, className, variants = defaultVariants, delay = 0 }: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
