"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MaskedInput } from "@/components/masked-input"
import { Lock, Zap, CheckCircle, AlertCircle, Clock, User, Mail, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

interface FormData {
  full_name: string
  email: string
  phone: string
}

interface TrackingData {
  ip?: string
  user_agent: string
  url_params: Record<string, string>
  referrer: string
  timestamp: number
}

export function ConversionForm() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)

  // Capturar dados de tracking quando o componente montar
  useEffect(() => {
    const captureTrackingData = async () => {
      try {
        // Capturar parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search)
        const params: Record<string, string> = {}
        
        // Converter URLSearchParams para objeto
        for (const [key, value] of urlParams.entries()) {
          params[key] = value
        }

        // Capturar user agent
        const userAgent = navigator.userAgent

        // Capturar referrer
        const referrer = document.referrer || ''

        // Capturar IP (usando serviço externo)
        let userIP = ''
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json')
          const ipData = await ipResponse.json()
          userIP = ipData.ip
        } catch (ipError) {
          console.warn('Não foi possível capturar o IP:', ipError)
        }

        const tracking: TrackingData = {
          ip: userIP,
          user_agent: userAgent,
          url_params: params,
          referrer: referrer,
          timestamp: Date.now()
        }

        setTrackingData(tracking)
        
      } catch (error) {
        console.error(error)
      }
    }

    captureTrackingData()
  }, [])

  const validateName = (name: string): string | null => {
  // Remove espaços em branco no início e fim
  const trimmedName = name.trim();
  
  // Verifica se está vazio após trim
  if (!trimmedName) {
    return "Nome é obrigatório.";
  }
  
  // Verifica se tem pelo menos 2 caracteres
  if (trimmedName.length < 2) {
    return "Nome deve ter pelo menos 2 caracteres.";
  }
  
  // Verifica se contém apenas espaços
  if (/^\s*$/.test(name)) {
    return "Nome não pode conter apenas espaços.";
  }
  
  // Verifica se contém apenas letras, espaços e alguns caracteres especiais (acentos)
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedName)) {
    return "Nome deve conter apenas letras.";
  }
  
  return null;
};
  
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const currentFormData = new FormData(event.currentTarget)
    const formDataObj: FormData = {
      full_name: currentFormData.get("full_name") as string,
      email: currentFormData.get("email") as string,
      phone: currentFormData.get("phone") as string,
    }

    // Validação básica
    if (!formDataObj.full_name || !formDataObj.email || !formDataObj.phone) {
      setError("Por favor, preencha todos os campos.")
      setIsSubmitting(false)
      return
    }

    // Validação aprimorada do nome
    const nameError = validateName(formDataObj.full_name);
    if (nameError) {
      setError(nameError);
      setIsSubmitting(false);
      return;
    }

    // Validação do consentimento
    if (!consentAccepted) {
      setError("Você deve aceitar os Termos de Uso e a Política de Privacidade para continuar.")
      setIsSubmitting(false)
      return
    }

    const normalizedPhone = formDataObj.phone.replace(/\D/g, "")
    if (!(normalizedPhone.length >= 10 && normalizedPhone.length <= 13)) {
      setError("Por favor, insira um número de telefone válido com DDD.")
      setIsSubmitting(false)
      return
    }

    try {
      // Preparar dados para envio incluindo tracking
      const webhookData = {
        full_name: formDataObj.full_name,
        email: formDataObj.email,
        phone: normalizedPhone,
        // Dados de tracking
        ip: trackingData?.ip || '',
        user_agent: trackingData?.user_agent || '',
        url_params: trackingData?.url_params || {},
        referrer: trackingData?.referrer || '',
        timestamp: trackingData?.timestamp || Date.now(),
        // Informações adicionais
        page_url: window.location.href,
        utm_source: trackingData?.url_params?.utm_source || '',
        utm_medium: trackingData?.url_params?.utm_medium || '',
        utm_campaign: trackingData?.url_params?.utm_campaign || '',
        utm_term: trackingData?.url_params?.utm_term || '',
        utm_content: trackingData?.url_params?.utm_content || '',
        gclid: trackingData?.url_params?.gclid || '', // Google Ads Click ID
        fbclid: trackingData?.url_params?.fbclid || '', // Facebook Click ID
        source: trackingData?.url_params?.source || '',
        medium: trackingData?.url_params?.medium || '',
        campaign: trackingData?.url_params?.campaign || ''
      }

      const response = await fetch("https://hooks.v4kuri.com.br/webhook/criar_autenticacao_2_fatores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error("Webhook Error (create):", responseData)
        setError("Não foi possível enviar o código. Tente novamente.")
        setIsSubmitting(false)
        return
      }

      // Store form data in sessionStorage for the verification page
      sessionStorage.setItem(
        "verificationData",
        JSON.stringify({
          full_name: formDataObj.full_name,
          email: formDataObj.email,
          phone: normalizedPhone,
        }),
      )

      // Redirect to verification page
      window.location.href = "/verificacao"

      setFormData({ ...formDataObj, phone: normalizedPhone })

      
    } catch (error) {
      console.error("Network Error (create):", error)
      setError("Ocorreu um erro de conexão. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCardTitle = () => {
        return "Preencha o formulário abaixo"
  }

  const getCardDescription = () => {
        return "Para criar uma conta em nossa plataforma e encontrar sua franquia ideal."
  }

  return (
    <Card className="w-full justify-self-center bg-secondary/30 border border-border text-white backdrop-blur-sm shadow-2xl shadow-orange-900/10">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          {getCardTitle()}
        </CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          {getCardDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {/* Mensagens de feedback */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
    
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="full_name" className="text-sm font-medium text-white flex items-center gap-2">
                <User className="h-4 w-4 text-[#F9A51A]" />
                Nome completo
                <span className="text-red-500">*</span>
              </label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="Digite seu nome completo"
                required
                disabled={isSubmitting}
                className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A] disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#F9A51A]" />
                  E-mail
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                disabled={isSubmitting}
                className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A] disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-white flex items-center gap-2">
                  <FaWhatsapp className="h-4 w-4 text-[#F9A51A]" />
                  Seu Whatsapp
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <MaskedInput
                id="phone"
                name="phone"
                placeholder="(11) 99999-9999"
                required
                disabled={isSubmitting}
                className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A] disabled:opacity-50"
              />
            </div>

            {/* Checkbox de consentimento */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 text-[#F9A51A] bg-secondary/50 border-border rounded focus:ring-[#F9A51A] focus:ring-2 disabled:opacity-50"
                />
                <label htmlFor="consent" className="text-sm text-gray-300 leading-relaxed">
                  Ao clicar, você concorda com os{" "}
                  <a 
                    href="/politica-de-privacidade" 
                    target="_blank" 
                    className="text-[#F9A51A] hover:underline"
                  >
                    Termos de Uso
                  </a>
                  {" "}e a{" "}
                  <a 
                    href="/politica-de-privacidade" 
                    target="_blank" 
                    className="text-[#F9A51A] hover:underline"
                  >
                    Política de Privacidade
                  </a>
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#F9A51A] to-[#F9821A] text-stone-950 font-bold text-md h-14 disabled:opacity-70"
            >
              {isSubmitting ? "Concluindo..." : "Descobrir minha franquia ideal"}
            </Button>
            <p className="text-center text-sm md:text-sm text-muted-foreground pt-2 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-green-500">
                <Lock className="h-3 w-3" /> 100% Seguro
              </span>
              <span className="flex items-center gap-1.5 text-pink-500">
                <Clock className="h-3 w-3" /> Resultado em minutos
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <Zap className="h-3 w-3" /> Acesso Imediato
              </span>
            </p>
          </form>

      </CardContent>
    </Card>
  )
}
