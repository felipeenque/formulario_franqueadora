"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OtpInput, type OtpInputRef } from "@/components/otp-input"
import { ArrowLeft, Shield } from "lucide-react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"

interface ValidateCodeResponse {
  success: boolean
  message: string
}

interface VerificationData {
  fullName: string
  email: string
  phone: string
}

export default function VerificationPage() {
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const otpInputRef = useRef<OtpInputRef>(null)

  useEffect(() => {
    // Get verification data from sessionStorage
    const storedData = sessionStorage.getItem("verificationData")
    if (storedData) {
      setVerificationData(JSON.parse(storedData))
      startCountdown()
    } else {
      // Redirect back to home if no verification data
      window.location.href = "/"
    }
  }, [])

  const validateCode = async (email: string, phone: string, code: string): Promise<ValidateCodeResponse> => {
    if (!code || code.length !== 6) {
      return { success: false, message: "O código deve ter 6 dígitos." }
    }

    try {
      const response = await fetch("https://hooks.v4kuri.com.br/webhook/autenticar_2_fatores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, code }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Webhook Error (validate):", errorData)
        return { success: false, message: errorData.message || "Código inválido ou expirado." }
      }

      return { success: true, message: "Código validado com sucesso!" }
    } catch (error) {
      console.error("Network Error (validate):", error)
      return { success: false, message: "Ocorreu um erro de conexão ao validar o código." }
    }
  }

  const requestCode = async (fullName: string, email: string, phone: string) => {
    try {
      const response = await fetch("https://hooks.v4kuri.com.br/webhook/criar_autenticacao_2_fatores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          "status": "reenviar"
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Webhook Error (create):", errorData)
        return { success: false, message: errorData.message || "Não foi possível enviar o código. Tente novamente." }
      }

      return { success: true, message: "Código enviado com sucesso!" }
    } catch (error) {
      console.error("Network Error (create):", error)
      return { success: false, message: "Ocorreu um erro de conexão. Por favor, tente novamente." }
    }
  }

  const startCountdown = () => {
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCodeValidation = async (code: string) => {
    if (!verificationData) return
    
    setIsValidating(true)
    setError(null)

    if (!code || code.length !== 6) {
      setError("O código deve ter 6 dígitos.")
      // Limpa os campos se o código não tem 6 dígitos
      if (otpInputRef.current) {
        otpInputRef.current?.clear()
      }
      setIsValidating(false)
      return
    }

    try {
      const response = await fetch("https://hooks.v4kuri.com.br/webhook/autenticar_2_fatores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: verificationData.email, 
          phone: verificationData.phone, 
          code 
        }),
      })

      const responseData = await response.json()

      const userData = {
        full_name: verificationData.full_name,
        email: verificationData.email,
        phone: verificationData.phone,
        timestamp: Date.now()
      }
        
      // Codificar dados em base64
      const encodedData = Buffer.from(JSON.stringify(userData)).toString('base64')

      // Verifica se o webhook retornou uma resposta válida
      if (responseData.response === "valid") {
        // Sucesso na validação
        setSuccessMessage("Código validado com sucesso! Você será redirecionado para a plataforma em instantes e receberá o seu acesso no seu e-mail.")
        
        // Redirecionar após um delay para mostrar a mensagem de sucesso
        setTimeout(() => {
          window.location.href = `https://match.franquia.com.br/?auto_login=${encodedData}`
        }, 3000)
      } else if (responseData.response === "invalid") {
        // Código inválido - limpa os campos
        setError("Código inválido ou expirado. Tente novamente.")
        if (otpInputRef.current) {
          otpInputRef.current?.clear()
        }
        setIsLoading(false)
        return
      } else {
        // Resposta inesperada do webhook - limpa os campos
        console.error("Webhook Error (validate):", responseData)
        setError("Erro inesperado na validação. Tente novamente.")
        if (otpInputRef.current) {
          otpInputRef.current?.clear()
        }
        setIsLoading(false)
        return
      }
      
    } catch (error) {
      console.error("Network Error (validate):", error)
      setError("Ocorreu um erro de conexão ao validar o código.")
      // Limpa os campos em caso de erro de rede
      if (otpInputRef.current) {
        otpInputRef.current?.clear()
      }
    } finally {
      setIsValidating(false)
    }
  }

  const handleResendCode = async () => {
    if (!verificationData) return
    setIsLoading(true)
    setError(null)
    otpInputRef.current?.clear()

    const result = await requestCode(verificationData.fullName, verificationData.email, verificationData.phone)

    if (result.success) {
      startCountdown()
    } else {
      setError(result.message)
    }

    setIsLoading(false)
  }

  const handleGoBack = () => {
    sessionStorage.removeItem("verificationData")
    window.location.href = "/"
  }

  if (!verificationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F9A51A] mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-gradient-background flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Image src="/franchise-logo.svg" alt="Franchise Store Logo" width={170} height={38} />
          <div className="flex items-center gap-1.5 text-gray-400">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm">Verificação Segura</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-secondary/30 border border-border text-white backdrop-blur-sm shadow-2xl shadow-orange-900/10">
            <CardHeader className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F9A51A] to-[#F9821A] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Verifique seu whatsapp</CardTitle>
              <CardDescription className="text-gray-400 pt-2">
                Para concluir o seu cadastro, digite abaixo o código de 6 dígitos que foi enviado no seu whatsapp
                <br />
                <span className="font-semibold text-white">
                  {verificationData.phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 pt-0">
              <div className="space-y-6">
                <OtpInput ref={otpInputRef} onComplete={handleCodeValidation} disabled={isLoading} />

                {successMessage && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-sm text-green-400 text-center">{successMessage}</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-red-400 text-center">{error}</p>
                  </div>
                )}

                <div className="text-center text-sm text-gray-500">
                  Não recebeu o código?{" "}
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading || countdown > 0}
                    className="text-[#F9A51A] hover:underline disabled:opacity-50 font-medium"
                  >
                    {countdown > 0 ? `Aguarde ${countdown}s` : isLoading ? "Reenviando..." : "Reenviar código"}
                  </button>
                </div>

                <Button
                  onClick={handleGoBack}
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50"
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar e corrigir dados
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Este código expira em 10 minutos por segurança.
              <br />
              Seus dados estão protegidos com criptografia de ponta.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
