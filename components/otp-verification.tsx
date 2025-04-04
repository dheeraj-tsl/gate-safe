"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

interface OtpVerificationProps {
  contactMethod: "phone" | "email"
  contactValue: string
  onBack: () => void
  onVerify: () => void
}

export function OtpVerification({ contactMethod, contactValue, onBack, onVerify }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [secondsLeft, setSecondsLeft] = useState(30)

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) {
      // If pasting a full OTP
      const digits = value.split("").slice(0, 4)
      const newOtp = [...otp]
      digits.forEach((digit, idx) => {
        if (idx + index < 4) {
          newOtp[idx + index] = digit
        }
      })
      setOtp(newOtp)

      // Move focus to the next input after the pasted digits
      const nextIndex = Math.min(index + digits.length, 3)
      const nextInput = document.getElementById(`otp-${nextIndex}`)
      if (nextInput) {
        nextInput.focus()
      }
    } else {
      // Single digit input
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move focus to the next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input when backspace is pressed and current input is empty
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResend = () => {
    if (secondsLeft > 0) return
    setSecondsLeft(30)
    // In a real app, you would call your API to resend the OTP
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="mb-2">
          Enter the verification code sent to your {contactMethod === "phone" ? "phone" : "email"}:
        </p>
        <div className="font-medium text-primary">
          {contactMethod === "phone" ? contactValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : contactValue}
        </div>
      </div>

      <div className="flex justify-center space-x-3 my-8">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="h-14 w-14 text-center text-xl font-medium rounded-xl"
          />
        ))}
      </div>

      <div className="text-center text-sm">
        <p>
          Didn&apos;t receive the code?{" "}
          <button
            className={`text-primary font-medium ${secondsLeft > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0}
          >
            Resend{secondsLeft > 0 ? ` (${secondsLeft}s)` : ""}
          </button>
        </p>
      </div>

      <div className="space-y-3">
        <Button
          className="w-full h-12 rounded-xl font-medium text-base"
          onClick={onVerify}
          disabled={otp.some((digit) => !digit)}
        >
          Verify
        </Button>

        <Button variant="outline" className="w-full h-12 rounded-xl font-medium text-base" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  )
}

