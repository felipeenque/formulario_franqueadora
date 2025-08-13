"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { Input, type InputProps } from "@/components/ui/input"

const applyCurrencyMask = (value: string | number): string => {
  // Converte para string se for número
  const stringValue = typeof value === "number" ? value.toString() : value

  // Remove tudo que não é dígito
  const cleaned = stringValue.replace(/\D/g, "")

  if (!cleaned) return ""

  // Converte para número e formata
  const number = Number.parseInt(cleaned) / 100

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number)
}

// Função para converter valor numérico para formato de moeda
const formatNumberToCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)
}

export function CurrencyMaskedInput({ onChange, value: propValue, ...props }: InputProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    if (propValue !== undefined && propValue !== null) {
      if (typeof propValue === "number") {
        // Se for número, formata diretamente
        setValue(formatNumberToCurrency(propValue))
      } else if (typeof propValue === "string") {
        // Se for string, aplica a máscara
        setValue(applyCurrencyMask(propValue))
      }
    }
  }, [propValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyCurrencyMask(e.target.value)
    setValue(maskedValue)
    if (onChange) {
      e.target.value = maskedValue
      onChange(e)
    }
  }

  return <Input {...props} value={value} onChange={handleChange} />
}
