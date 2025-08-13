"use server"

// Essas funções agora são mais simples e podem ser usadas como fallback
// A lógica principal foi movida para o frontend para uma experiência mais suave

interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

export async function requestCodeServer(formData: FormData): Promise<ApiResponse> {
  const fullName = formData.get("full_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  if (!fullName || !email || !phone) {
    return { success: false, message: "Por favor, preencha todos os campos." }
  }

  const normalizedPhone = phone.replace(/\D/g, "")
  if (!(normalizedPhone.length >= 10 && normalizedPhone.length <= 13)) {
    return { success: false, message: "Por favor, insira um número de telefone válido com DDD." }
  }

  try {
    const response = await fetch("https://hooks.v4kuri.com.br/webhook/criar_autenticacao_2_fatores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone: normalizedPhone,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Webhook Error (create):", responseData)
      return { 
        success: false, 
        message: responseData.message || "Não foi possível enviar o código. Tente novamente." 
      }
    }

    return { 
      success: true, 
      message: responseData.message || "Código enviado com sucesso!",
      data: responseData
    }
  } catch (error) {
    console.error("Network Error (create):", error)
    return { success: false, message: "Ocorreu um erro de conexão. Por favor, tente novamente." }
  }
}

export async function validateCodeServer(email: string, phone: string, code: string): Promise<ApiResponse> {
  if (!code || code.length !== 6) {
    return { success: false, message: "O código deve ter 6 dígitos." }
  }

  try {
    const response = await fetch("https://hooks.v4kuri.com.br/webhook/autenticar_2_fatores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, code }),
    })

    const responseData = await response.json()

    // Verifica a resposta específica do webhook
    if (responseData.response === "valid") {
      return { 
        success: true, 
        message: "Código validado com sucesso!",
        data: responseData
      }
    } else if (responseData.response === "invalid") {
      return { 
        success: false, 
        message: "Código inválido ou expirado." 
      }
    } else {
      // Resposta inesperada
      console.error("Webhook Error (validate):", responseData)
      return { 
        success: false, 
        message: "Erro inesperado na validação. Tente novamente." 
      }
    }
  } catch (error) {
    console.error("Network Error (validate):", error)
    return { success: false, message: "Ocorreu um erro de conexão ao validar o código." }
  }
}

// Função para redirecionar após validação bem-sucedida
export async function redirectToMatch() {
  // Esta função pode ser chamada pelo frontend após validação bem-sucedida
  // ou pode ser usada em conjunto com as validações do servidor
  const redirectUrl = "https://match.franquia.com.br/login/"
  
  // Log para debugging
  console.log("Redirecting to:", redirectUrl)
  
  // No servidor, podemos usar redirect do Next.js
  // No frontend, usamos window.location.href
  return { success: true, redirectUrl }
}
