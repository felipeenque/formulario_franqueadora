"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MaskedInput } from "@/components/masked-input"
import { CnpjMaskedInput } from "@/components/cnpj-masked-input"
import { submitFranchisorForm } from "@/app/franchise/actions"
import { Building, User, Mail, Briefcase, Phone, AlertCircle, CheckCircle, Landmark } from "lucide-react"

export function FranchisorForm() {
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setState(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const result = await submitFranchisorForm(formData)
      setState(result)
      if (result.success) form.reset()
    } catch (err) {
      console.error(err)
      setState({ success: false, message: "Erro inesperado. Tente novamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-secondary/30 border border-border text-white backdrop-blur-sm shadow-2xl shadow-orange-900/10">
      <CardHeader className="text-center p-8">
        <CardTitle className="text-3xl font-bold text-white">Preencha o formulário abaixo</CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Descubra como podemos ajudar sua marca a se tornar uma franquia de sucesso.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome da Marca */}
          <div className="space-y-2">
            <label htmlFor="brandName" className="text-sm font-medium text-white flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#F9A51A]" />
              Nome da Marca
            </label>
            <Input
              id="brandName"
              name="brandName"
              placeholder="Ex: Kuri, Boutique do Sono, etc."
              required
              disabled={isSubmitting}
              className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A]"
            />
          </div>

          {/* CNPJ */}
          <div className="space-y-2">
            <label htmlFor="cnpj" className="text-sm font-medium text-white flex items-center gap-2">
              <Building className="h-4 w-4 text-[#F9A51A]" />
              CNPJ
            </label>
            <CnpjMaskedInput
              id="cnpj"
              name="cnpj"
              placeholder="00.000.000/0000-00"
              required
              disabled={isSubmitting}
              className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A]"
            />
          </div>

          {/* Nome e Cargo lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white flex items-center gap-2">
                <User className="h-4 w-4 text-[#F9A51A]" />
                Seu Nome
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Nome do responsável"
                required
                disabled={isSubmitting}
                className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#F9A51A]" />
                Seu Cargo
              </label>
              <Input
                id="role"
                name="role"
                placeholder="Ex: Diretor, Sócio, etc."
                required
                disabled={isSubmitting}
                className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#F9A51A]" />
              E-mail Corporativo
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              disabled={isSubmitting}
              className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A]"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-white flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#F9A51A]" />
              Telefone para Contato
            </label>
            <MaskedInput
              id="phone"
              name="phone"
              placeholder="(11) 99999-9999"
              required
              disabled={isSubmitting}
              className="bg-secondary/50 border border-border h-12 placeholder:text-gray-500 focus:ring-[#F9A51A] focus:border-[#F9A51A]"
            />
          </div>

          {/* Mensagem de status */}
          {state && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                state.success
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-red-500/10 border border-red-500/20"
              }`}
            >
              {state.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <p
                className={`text-sm ${
                  state.success ? "text-green-400" : "text-red-400"
                }`}
              >
                {state.message}
              </p>
            </div>
          )}

          {/* Botão */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#F9A51A] to-[#F9821A] text-stone-950 font-bold text-md h-14 disabled:opacity-70"
          >
            {isSubmitting ? "Enviando..." : "Quero Expandir Minha Marca"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
