"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, ArrowRight, Loader2, Wifi, WifiOff } from "lucide-react"
import { OnboardingProgressBar } from "./onboarding-progress-bar"

import { Step1CompanyData } from "./onboarding-steps/step1-company-data"
import { Step2Address } from "./onboarding-steps/step2-address"
import { Step3StoreModels } from "./onboarding-steps/step3-store-models"
import { Step4ProfileAttachments } from "./onboarding-steps/step4-profile-attachments"
import { saveOnboardingStep } from "@/app/franchise/onboarding/actions"

const steps = [
  { id: 1, name: "Dados da Empresa" },
  { id: 2, name: "Endereço e redes sociais" },
  { id: 3, name: "Modelos de Loja" },
  { id: 4, name: "Perfil e Anexos" },
]

const initialFormDataTemplate = {
  company: {
    nomeMarca: "",
    razaoSocial: "",
    cnpj: "",
    segmento: "",
    subsegmento: "",
  },
  address: {
    cep: "",
    logradouro: "",
    numero: "",
    estado: "",
    cidade: "",
    facebook: "",
    site: "",
    instagram: "",
    linkedin: "",
  },
  storeModels: [],
  profile: {
    expVendas: "",
    expMarketing: "",
    expAtendimento: "",
    expOperacoes: "",
    expFinancas: "",
    cofFile: null,
    presentationFile: null,
  },
}

// Helper functions for deep merging
const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item)
}

const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key]) && !Array.isArray(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

// Função melhorada para converter base64 de volta para File
function base64ToFile(base64Data: string, fileName: string, mimeType: string): File | null {
  try {
    console.log(`Converting base64 to file: ${fileName}, type: ${mimeType}`)
    console.log(`Base64 data length: ${base64Data.length}`)
    console.log(`Base64 preview: ${base64Data.substring(0, 50)}...`)

    // Verificar se o base64 é válido
    if (!base64Data || typeof base64Data !== "string") {
      console.error("Base64 data is invalid:", base64Data)
      return null
    }

    // Remover possível prefixo data URL se existir
    let cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, "")

    // Remover prefixo b' se existir (formato Python bytes)
    if (cleanBase64.startsWith("b'") && cleanBase64.endsWith("'")) {
      cleanBase64 = cleanBase64.slice(2, -1)
    }

    const byteCharacters = atob(cleanBase64)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const file = new File([byteArray], fileName, { type: mimeType })

    console.log(`File created successfully:`, {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    })

    return file
  } catch (error) {
    console.error("Erro ao converter base64 para File:", error)
    console.error("Base64 data:", base64Data?.substring(0, 100))
    console.error("File name:", fileName)
    console.error("MIME type:", mimeType)
    return null
  }
}

// Função para processar dados do servidor e converter base64 para File
function processServerData(data: any) {
  console.log("=== PROCESSING SERVER DATA ===")
  console.log("Raw server data:", JSON.stringify(data, null, 2))

  const processedData = JSON.parse(JSON.stringify(data)) // Deep clone

  // Processar arquivos do perfil
  if (data.profile) {
    console.log("=== PROCESSING PROFILE FILES ===")
    console.log("Profile data:", data.profile)

    // Processar COF File
    if (data.profile.cofFile) {
      console.log("COF File data:", data.profile.cofFile)

      // Verificar se é um objeto com dados base64
      if (typeof data.profile.cofFile === "object" && data.profile.cofFile.data) {
        console.log("Converting COF file from base64 object...")
        const convertedFile = base64ToFile(
          data.profile.cofFile.data,
          data.profile.cofFile.name,
          data.profile.cofFile.type,
        )

        if (convertedFile) {
          processedData.profile.cofFile = convertedFile
          console.log("COF file converted successfully:", convertedFile)
        } else {
          console.error("Failed to convert COF file")
          processedData.profile.cofFile = null
        }
      }
      // Verificar se é uma string base64 direta
      else if (typeof data.profile.cofFile === "string") {
        console.log("Converting COF file from base64 string...")
        const convertedFile = base64ToFile(
          data.profile.cofFile,
          "cof-document.pdf", // nome padrão
          "application/pdf", // tipo padrão
        )

        if (convertedFile) {
          processedData.profile.cofFile = convertedFile
          console.log("COF file converted successfully:", convertedFile)
        } else {
          console.error("Failed to convert COF file")
          processedData.profile.cofFile = null
        }
      } else {
        console.log("COF file is not in expected format:", data.profile.cofFile)
      }
    }

    // Processar Presentation File
    if (data.profile.presentationFile) {
      console.log("Presentation File data:", data.profile.presentationFile)

      // Verificar se é um objeto com dados base64
      if (typeof data.profile.presentationFile === "object" && data.profile.presentationFile.data) {
        console.log("Converting presentation file from base64 object...")
        const convertedFile = base64ToFile(
          data.profile.presentationFile.data,
          data.profile.presentationFile.name,
          data.profile.presentationFile.type,
        )

        if (convertedFile) {
          processedData.profile.presentationFile = convertedFile
          console.log("Presentation file converted successfully:", convertedFile)
        } else {
          console.error("Failed to convert presentation file")
          processedData.profile.presentationFile = null
        }
      }
      // Verificar se é uma string base64 direta
      else if (typeof data.profile.presentationFile === "string") {
        console.log("Converting presentation file from base64 string...")
        const convertedFile = base64ToFile(
          data.profile.presentationFile,
          "presentation.pdf", // nome padrão
          "application/pdf", // tipo padrão
        )

        if (convertedFile) {
          processedData.profile.presentationFile = convertedFile
          console.log("Presentation file converted successfully:", convertedFile)
        } else {
          console.error("Failed to convert presentation file")
          processedData.profile.presentationFile = null
        }
      } else {
        console.log("Presentation file is not in expected format:", data.profile.presentationFile)
      }
    }
  }

  // Processar fotos dos modelos de loja
  if (data.storeModels && Array.isArray(data.storeModels)) {
    console.log("=== PROCESSING STORE MODELS ===")
    console.log("Store models data:", data.storeModels)

    processedData.storeModels = data.storeModels.map((model, index) => {
      console.log(`Processing model ${index}:`, model)

      if (model.foto) {
        console.log(`Model ${index} foto data:`, model.foto)

        // Verificar se é um objeto com dados base64
        if (typeof model.foto === "object" && model.foto.data) {
          console.log(`Converting foto for model ${index} from object...`)
          const convertedFile = base64ToFile(model.foto.data, model.foto.name, model.foto.type)

          if (convertedFile) {
            console.log(`Model ${index} foto converted successfully:`, convertedFile)
            return { ...model, foto: convertedFile }
          } else {
            console.error(`Failed to convert foto for model ${index}`)
            return { ...model, foto: null }
          }
        }
        // Verificar se é uma string base64 direta
        else if (typeof model.foto === "string") {
          console.log(`Converting foto for model ${index} from string...`)
          const convertedFile = base64ToFile(
            model.foto,
            `model-${index}-photo.jpg`, // nome padrão
            "image/jpeg", // tipo padrão
          )

          if (convertedFile) {
            console.log(`Model ${index} foto converted successfully:`, convertedFile)
            return { ...model, foto: convertedFile }
          } else {
            console.error(`Failed to convert foto for model ${index}`)
            return { ...model, foto: null }
          }
        } else {
          console.log(`Model ${index} foto is not in expected format:`, model.foto)
        }
      }

      return model
    })
  }

  console.log("=== FINAL PROCESSED DATA ===")
  console.log("Processed data:", processedData)

  return processedData
}

export function FranchiseOnboardingForm({ initialData }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(() => {
    console.log("=== INITIALIZING FORM DATA ===")
    console.log("Initial data received:", initialData)

    const webhookData = {
      ...(initialData.data || {}),
      company: {
        ...(initialData.data?.company || {}),
        cnpj: initialData.cnpj,
        nomeMarca: initialData.marca,
      },
    }

    console.log("Webhook data before processing:", webhookData)

    // Processar dados do servidor (converter base64 para File se necessário)
    const processedWebhookData = processServerData(webhookData)

    console.log("Processed webhook data:", processedWebhookData)

    const templateCopy = JSON.parse(JSON.stringify(initialFormDataTemplate))
    const finalData = mergeDeep(templateCopy, processedWebhookData)

    console.log("=== FINAL FORM DATA ===")
    console.log("Final form data:", finalData)

    // Log específico dos arquivos
    if (finalData.profile) {
      console.log("Profile files in final data:")
      console.log("- COF File:", finalData.profile.cofFile)
      console.log("- Presentation File:", finalData.profile.presentationFile)
    }

    if (finalData.storeModels) {
      console.log("Store models in final data:")
      finalData.storeModels.forEach((model, index) => {
        console.log(`- Model ${index} foto:`, model.foto)
      })
    }

    return finalData
  })
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [stepError, setStepError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessRedirect, setShowSuccessRedirect] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [currentStep])

  // Debug: Log form data changes
  useEffect(() => {
    console.log("=== FORM DATA UPDATED ===")
    console.log("Current form data:", formData)

    // Log específico dos arquivos quando o form data muda
    if (formData.profile) {
      console.log("Current profile files:")
      console.log("- COF File:", formData.profile.cofFile)
      console.log("- Presentation File:", formData.profile.presentationFile)
    }

    if (formData.storeModels) {
      console.log("Current store models:")
      formData.storeModels.forEach((model, index) => {
        console.log(`- Model ${index} foto:`, model.foto)
      })
    }
  }, [formData])

  const validateStep = (step: number) => {
    const missingFields = []
    switch (step) {
      case 0:
        const { nomeMarca, razaoSocial, cnpj, segmento, subsegmento } = formData.company
        if (!nomeMarca) missingFields.push("Nome da Marca")
        if (!razaoSocial) missingFields.push("Razão Social")
        if (!cnpj) missingFields.push("CNPJ")
        if (!segmento) missingFields.push("Segmento")
        if (!subsegmento) missingFields.push("Subsegmento")
        break
      case 1:
        const { cep, logradouro, numero, estado, cidade } = formData.address
        if (!cep) missingFields.push("CEP")
        if (!logradouro) missingFields.push("Logradouro")
        if (!numero) missingFields.push("Número")
        if (!estado) missingFields.push("Estado")
        if (!cidade) missingFields.push("Cidade")
        break
      case 2:
        if (formData.storeModels.length === 0) {
          missingFields.push("Pelo menos um modelo de loja")
        } else {
          formData.storeModels.forEach((model, index) => {
            const modelNumber = `Modelo ${index + 1}`
            if (!model.nome) missingFields.push(`${modelNumber}: Nome do Modelo`)
            if (!model.tipo) missingFields.push(`${modelNumber}: Tipo de Modelo`)
            if (!model.investimento) missingFields.push(`${modelNumber}: Investimento`)
            if (!model.taxaFranquia) missingFields.push(`${modelNumber}: Taxa de Franquia`)
            if (!model.royalties) missingFields.push(`${modelNumber}: Royalties`)
            if (!model.faturamentoMedio) missingFields.push(`${modelNumber}: Faturamento Médio`)
            if (!model.lucratividadeMediaMin) missingFields.push(`${modelNumber}: Lucratividade Mínima`)
            if (!model.lucratividadeMediaMax) missingFields.push(`${modelNumber}: Lucratividade Máxima`)
            if (!model.prazoRetornoMin) missingFields.push(`${modelNumber}: Prazo de Retorno Mínimo`)
            if (!model.prazoRetornoMax) missingFields.push(`${modelNumber}: Prazo de Retorno Máximo`)
            if (!model.funcionarios) missingFields.push(`${modelNumber}: Funcionários Necessários`)
          })
        }
        break
      case 3:
        const { expVendas, expMarketing, expAtendimento, expOperacoes, expFinancas, cofFile } = formData.profile
        if (!expVendas) missingFields.push("Experiência em Vendas")
        if (!expMarketing) missingFields.push("Experiência em Marketing")
        if (!expAtendimento) missingFields.push("Experiência em Atendimento")
        if (!expOperacoes) missingFields.push("Experiência em Operações")
        if (!expFinancas) missingFields.push("Experiência em Finanças")
        if (!cofFile) missingFields.push("Anexo COF (Circular de Oferta de Franquia)")
        break
    }
    return { isValid: missingFields.length === 0, missingFields }
  }

  const handleNext = async () => {
    const validation = validateStep(currentStep)
    if (!validation.isValid) {
      const fieldsList = validation.missingFields.join(", ")
      setStepError(`Por favor, preencha os seguintes campos obrigatórios: ${fieldsList}`)
      return
    }

    setIsSubmitting(true)
    setStepError(null)

    // Determinar qual dados enviar baseado no step atual
    let dataToSend
    switch (currentStep) {
      case 0:
        dataToSend = formData.company
        break
      case 1:
        dataToSend = formData.address
        break
      case 2:
        dataToSend = formData.storeModels
        break
      case 3:
        dataToSend = formData.profile
        break
      default:
        dataToSend = {}
    }

    const result = await saveOnboardingStep({
      token: initialData.token,
      step: currentStep + 1,
      data: dataToSend,
    })

    setIsSubmitting(false)

    if (result.success) {
      setRetryCount(0) // Reset retry count on success
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      setStepError(result.message)

      // Se for erro de conexão, mostrar opção de retry
      if (result.message.includes("conexão") || result.message.includes("Tempo limite")) {
        setRetryCount((prev) => prev + 1)
      }
    }
  }

  const handleRetry = () => {
    setStepError(null)
    handleNext()
  }

  const handlePrev = () => {
    setStepError(null)
    setRetryCount(0)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (data: any) => {
    console.log("=== UPDATING FORM DATA ===")
    console.log("Update data received:", data)
    setFormData((prev) => {
      const newData = { ...prev, ...data }
      console.log("New form data after update:", newData)
      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateStep(3)
    if (!validation.isValid) {
      const fieldsList = validation.missingFields.join(", ")
      setStepError(`Por favor, preencha os seguintes campos obrigatórios: ${fieldsList}`)
      return
    }

    setIsSubmitting(true)
    setFormStatus(null)

    const result = await saveOnboardingStep({
      token: initialData.token,
      step: 4,
      data: formData.profile,
      status: "completed",
    })

    setFormStatus(result)
    setIsSubmitting(false)

    if (result.success) {
      setShowSuccessRedirect(true)
      setTimeout(() => {
        window.location.href = "/franchise"
      }, 5000)
    }
  }

  if (showSuccessRedirect) {
    return (
      <div className="w-full max-w-2xl mx-auto" ref={formRef}>
        <Card className="bg-secondary/30 border border-border text-white backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Cadastro Realizado com Sucesso!</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Sua franquia foi cadastrada em nossa plataforma. Nossa equipe entrará em contato em breve.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <p className="text-blue-400 text-sm flex items-center justify-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Você será redirecionado em instantes...
              </p>
            </div>
            <Button
              onClick={() => (window.location.href = "/franchise")}
              className="bg-gradient-to-r from-[#F9A51A] to-[#F9821A] text-stone-950 font-bold"
            >
              Ir para Plataforma Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0" ref={formRef}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-balance">Onboarding Franqueadora</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground text-balance">
          Complete as etapas abaixo para cadastrar sua marca em nossa plataforma e conectar-se com milhares de
          investidores.
        </p>
      </div>
      <OnboardingProgressBar currentStep={currentStep} steps={steps} />
      <Card className="mt-8 bg-secondary/30 border border-border text-white backdrop-blur-sm">
        <CardContent className="p-4 md:p-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && <Step1CompanyData data={formData.company} update={updateFormData} />}
                {currentStep === 1 && <Step2Address data={formData.address} update={updateFormData} />}
                {currentStep === 2 && <Step3StoreModels data={formData.storeModels} update={updateFormData} />}
                {currentStep === 3 && <Step4ProfileAttachments data={formData.profile} update={updateFormData} />}
              </motion.div>
            </AnimatePresence>

            {stepError && (
              <Alert variant="destructive" className="mt-6 bg-red-500/10 border-red-500/20 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {stepError.includes("conexão") || stepError.includes("Tempo limite") ? (
                    <div className="flex items-center gap-2">
                      <WifiOff className="h-4 w-4" />
                      Problema de Conexão
                    </div>
                  ) : (
                    "Campos Obrigatórios"
                  )}
                </AlertTitle>
                <AlertDescription className="text-sm leading-relaxed">
                  {stepError}
                  {(stepError.includes("conexão") || stepError.includes("Tempo limite")) && retryCount > 0 && (
                    <div className="mt-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleRetry}
                        className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                      >
                        <Wifi className="h-3 w-3 mr-2" />
                        Tentar Novamente
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {formStatus && !formStatus.success && (
              <Alert className="mt-6 bg-red-500/10 border-red-500/20 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro!</AlertTitle>
                <AlertDescription>{formStatus.message}</AlertDescription>
              </Alert>
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0 || isSubmitting}
                className="hover:bg-gray-700 w-full sm:w-auto order-2 sm:order-1"
              >
                Anterior
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#F9A51A] to-[#F9821A] text-stone-950 font-bold w-full sm:w-auto order-1 sm:order-2"
                >
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? "Salvando..." : "Próximo"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold w-full sm:w-auto order-1 sm:order-2"
                >
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
