"use server"

const WEBHOOK_URL = "https://api.lab.v4kuri.com.br/webhook/onboarding_marcas"

interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

// Função para converter File para base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove o prefixo "data:mime/type;base64," para ter apenas o base64
      const base64 = result.split(",")[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

// Função para processar arquivos e converter para base64
async function processFilesInData(data: any): Promise<any> {
  const processedData = { ...data }

  // Processar arquivos do perfil (step 4)
  if (data.cofFile && data.cofFile instanceof File) {
    try {
      const base64 = await fileToBase64(data.cofFile)
      processedData.cofFile = {
        name: data.cofFile.name,
        type: data.cofFile.type,
        size: data.cofFile.size,
        data: base64,
      }
    } catch (error) {
      console.error("Erro ao converter cofFile:", error)
      processedData.cofFile = null
    }
  }

  if (data.presentationFile && data.presentationFile instanceof File) {
    try {
      const base64 = await fileToBase64(data.presentationFile)
      processedData.presentationFile = {
        name: data.presentationFile.name,
        type: data.presentationFile.type,
        size: data.presentationFile.size,
        data: base64,
      }
    } catch (error) {
      console.error("Erro ao converter presentationFile:", error)
      processedData.presentationFile = null
    }
  }

  return processedData
}

// Função para processar fotos dos modelos de loja
async function processStoreModelsFiles(storeModels: any[]): Promise<any[]> {
  const processedModels = []

  for (const model of storeModels) {
    const processedModel = { ...model }

    if (model.foto && model.foto instanceof File) {
      try {
        const base64 = await fileToBase64(model.foto)
        processedModel.foto = {
          name: model.foto.name,
          type: model.foto.type,
          size: model.foto.size,
          data: base64,
        }
      } catch (error) {
        console.error("Erro ao converter foto do modelo:", error)
        processedModel.foto = null
      }
    }

    processedModels.push(processedModel)
  }

  return processedModels
}

export async function validateOnboardingToken(token: string): Promise<ApiResponse> {
  if (!token) {
    return { success: false, message: "Token não fornecido." }
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 segundos timeout

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Verificar se a resposta é JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text()
      console.error("Non-JSON response received:", textResponse.substring(0, 200))
      return {
        success: false,
        message: "Servidor retornou resposta inválida. Tente novamente em alguns minutos.",
      }
    }

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Webhook Error (Token Validation):", responseData)
      return { success: false, message: responseData.message || "Não foi possível validar o token." }
    }

    return { success: true, message: "Token validado.", data: responseData }
  } catch (error) {
    console.error("Network Error (Token Validation):", error)

    if (error.name === "AbortError") {
      return { success: false, message: "Tempo limite excedido. Verifique sua conexão e tente novamente." }
    }

    return { success: false, message: "Ocorreu um erro de conexão. Por favor, tente novamente." }
  }
}

export async function saveOnboardingStep(payload: {
  token: string
  step: number
  data: any
  status?: string
}): Promise<ApiResponse> {
  const { token, step, data, status } = payload

  try {
    let processedData = data

    // Processar arquivos baseado no step
    if (step === 3) {
      // Step 3: Processar fotos dos modelos de loja
      processedData = await processStoreModelsFiles(data)
    } else if (step === 4) {
      // Step 4: Processar arquivos do perfil
      processedData = await processFilesInData(data)
    }

    const requestBody: any = {
      token,
      step,
      data: processedData,
    }

    if (status) {
      requestBody.status = status
    }

    console.log(
      "Sending step data:",
      JSON.stringify(
        {
          ...requestBody,
          data: step === 3 || step === 4 ? "... (dados com arquivos processados)" : requestBody.data,
        },
        null,
        2,
      ),
    )

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 segundos timeout para uploads

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Verificar se a resposta é JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text()
      console.error(`Non-JSON response received for step ${step}:`, textResponse.substring(0, 200))

      // Se for erro 500, mostrar mensagem mais específica
      if (response.status >= 500) {
        return {
          success: false,
          message: "Erro interno do servidor. Nossa equipe foi notificada. Tente novamente em alguns minutos.",
        }
      }

      return {
        success: false,
        message: "Servidor retornou resposta inválida. Tente novamente em alguns minutos.",
      }
    }

    const responseData = await response.json()

    if (!response.ok || responseData.response !== "success") {
      console.error(`Webhook Error (Step ${step}):`, responseData)
      return { success: false, message: responseData.message || `Erro ao salvar a etapa ${step}.` }
    }

    return { success: true, message: `Etapa ${step} salva com sucesso!` }
  } catch (error) {
    console.error(`Network Error (Step ${step}):`, error)

    if (error.name === "AbortError") {
      return { success: false, message: "Tempo limite excedido. Verifique sua conexão e tente novamente." }
    }

    if (error.message && error.message.includes("JSON")) {
      return {
        success: false,
        message: "Erro de comunicação com o servidor. Tente novamente em alguns minutos.",
      }
    }

    return { success: false, message: "Ocorreu um erro de conexão ao salvar os dados." }
  }
}

export async function submitOnboardingForm(formData: any): Promise<ApiResponse> {
  console.log("Received Onboarding Data:", JSON.stringify(formData, null, 2))

  // Here you would perform comprehensive validation and data processing
  // For example, check if CNPJ already exists, validate all required fields, etc.

  const { company, address, storeModels } = formData

  if (!company.razaoSocial || !company.cnpj) {
    return { success: false, message: "Dados da empresa incompletos. Por favor, verifique o Passo 1." }
  }

  if (!address.cep || !address.logradouro) {
    return { success: false, message: "Endereço incompleto. Por favor, verifique o Passo 2." }
  }

  if (storeModels.length === 0 || !storeModels[0].nome) {
    return {
      success: false,
      message: "É necessário adicionar pelo menos um modelo de loja. Por favor, verifique o Passo 3.",
    }
  }

  // Simulate API call to save the data
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would handle file uploads here,
  // likely by getting a signed URL from your storage provider (e.g., Vercel Blob, S3)
  // and uploading the files from the client.

  return {
    success: true,
    message:
      "Cadastro da franquia recebido com sucesso! Nossa equipe entrará em contato em breve para os próximos passos.",
  }
}
