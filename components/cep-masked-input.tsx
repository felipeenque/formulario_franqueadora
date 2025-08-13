"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { Input, type InputProps } from "@/components/ui/input"

const applyCepMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  const v = cleaned.substring(0, 8) // CEP has 8 digits

  if (v.length > 5) {
    return `${v.substring(0, 5)}-${v.substring(5)}`
  }
  return v
}

export function CepMaskedInput({ onChange, value: propValue, ...props }: InputProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (propValue) {
      setValue(applyCepMask(propValue))
    }
  }, [propValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyCepMask(e.target.value)
    setValue(maskedValue)
    if (onChange) {
      e.target.value = maskedValue
      onChange(e)
    }
  }

  return <Input {...props} value={value} onChange={handleChange} />
}
