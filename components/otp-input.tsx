"use client"

import type React from "react"
import { useState, useRef, useImperativeHandle, forwardRef } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  onComplete: (otp: string) => void
  disabled?: boolean
}

export interface OtpInputRef {
  clear: () => void
}

const OTP_LENGTH = 6

export const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(({ onComplete, disabled }, ref) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const clearOtp = () => {
    const newOtp = new Array(OTP_LENGTH).fill("")
    setOtp(newOtp)
    inputRefs.current[0]?.focus()
  }

  useImperativeHandle(ref, () => ({
    clear: clearOtp,
  }))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (/[^0-9]/.test(value)) return // Only allow numbers

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take the last digit
    setOtp(newOtp)

    const combinedOtp = newOtp.join("")
    if (combinedOtp.length === OTP_LENGTH) {
      onComplete(combinedOtp)
    } else if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH)
    if (pasteData) {
      const newOtp = pasteData.split("").concat(new Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH)
      setOtp(newOtp)
      const combinedOtp = newOtp.join("")
      if (combinedOtp.length === OTP_LENGTH) {
        onComplete(combinedOtp)
      }
      inputRefs.current[pasteData.length - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2 md:gap-3" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel" // Use tel for better mobile keyboard support
          maxLength={1}
          value={digit}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className="w-12 h-14 text-center text-2xl font-bold bg-primary/20 border border-border focus:ring-[#F9A51A] focus:border-[#F9A51A]"
        />
      ))}
    </div>
  )
})

OtpInput.displayName = "OtpInput"
