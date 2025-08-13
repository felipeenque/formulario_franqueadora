"use client"

import { useState, type ChangeEvent } from "react"
import { Input, type InputProps } from "@/components/ui/input"

const applyPhoneMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")

  if (cleaned.startsWith("55")) {
    const v = cleaned.substring(0, 13) // Max length: 55 + 11 digits
    if (v.length > 7) {
      return `+55 (${v.substring(2, 4)}) ${v.substring(4, 9)}-${v.substring(9)}`
    }
    if (v.length > 4) {
      return `+55 (${v.substring(2, 4)}) ${v.substring(4)}`
    }
    if (v.length > 2) {
      return `+55 (${v.substring(2)}`
    }
    return v
  } else {
    const v = cleaned.substring(0, 11) // Max length: 11 digits
    if (v.length > 6) {
      return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`
    }
    if (v.length > 2) {
      return `(${v.substring(0, 2)}) ${v.substring(2)}`
    }
    return v
  }
}

export function MaskedInput({ onChange, ...props }: InputProps) {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value)
    setValue(maskedValue)
    if (onChange) {
      // We pass the original event but with the masked value
      e.target.value = maskedValue
      onChange(e)
    }
  }

  return <Input {...props} value={value} onChange={handleChange} />
}
