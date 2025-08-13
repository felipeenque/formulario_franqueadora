"use server";

export interface ApiResponse {
  success: boolean;
  message: string;
}

const WEBHOOK_URL = "https://api.lab.v4kuri.com.br/webhook/criar_marca_portal";

export async function submitFranchisorForm(
  formData: FormData
): Promise<ApiResponse> {
  const cnpj = formData.get("cnpj") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const phone = formData.get("phone") as string;
  const brandName = formData.get("brandName") as string; // NOVO CAMPO

  // Validações básicas
  if (!cnpj || !name || !email || !role || !phone || !brandName) {
    return { success: false, message: "Por favor, preencha todos os campos." };
  }

  const normalizedCnpj = cnpj.replace(/\D/g, "");
  if (normalizedCnpj.length !== 14) {
    return { success: false, message: "CNPJ inválido." };
  }

  const normalizedPhone = phone.replace(/\D/g, "");
  if (!(normalizedPhone.length >= 10 && normalizedPhone.length <= 13)) {
    return { success: false, message: "Telefone inválido." };
  }

  // Payload para o webhook
  const payload = {
    cnpj: normalizedCnpj,
    name,
    email,
    role,
    phone: normalizedPhone,
    brandName, // incluído no webhook
    source: "portal-franqueadoras",
    submittedAt: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Webhook error:", res.status, text);
      return {
        success: false,
        message: "Não conseguimos processar agora. Tente novamente em instantes.",
      };
    }

    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
      success?: boolean;
    };

    return {
      success: data?.success ?? true,
      message:
        data?.message ??
        "Cadastro recebido! Em breve nossa equipe entrará em contato.",
    };
  } catch (err) {
    console.error("Webhook request failed:", err);
    return {
      success: false,
      message: "Falha de conexão. Verifique a internet e tente novamente.",
    };
  }
}
