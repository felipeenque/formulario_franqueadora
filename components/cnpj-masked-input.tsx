"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { Input, type InputProps } from "@/components/ui/input"

const applyCnpjMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  const v = cleaned.substring(0, 14) // CNPJ has 14 digits

  if (v.length > 12) {
    return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8, 12)}-${v.substring(12)}`
  }
  if (v.length > 8) {
    return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5, 8)}/${v.substring(8)}`
  }
  if (v.length > 5) {
    return `${v.substring(0, 2)}.${v.substring(2, 5)}.${v.substring(5)}`
  }
  if (v.length > 2) {
    return `${v.substring(0, 2)}.${v.substring(2)}`
  }
  return v
}

export function CnpjMaskedInput({ onChange, value: propValue, ...props }: InputProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (propValue) {
      setValue(applyCnpjMask(propValue))
    }
  }, [propValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyCnpjMask(e.target.value)
    setValue(maskedValue)
    if (onChange) {
      e.target.value = maskedValue
      onChange(e)
    }
  }

  return <Input {...props} value={value} onChange={handleChange} />
}
