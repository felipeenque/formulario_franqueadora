"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, TrendingUp, Megaphone, Smile, Settings, Banknote, Download, FileText, X, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useMobile } from "@/hooks/use-mobile"

type SerializableFile = {
  name: string
  type: string
  size?: number
  data: string // base64 (sem prefixo data:)
}

const FileInput = ({ label, name, onChange, fileName, existingFile, required = false }) => {

  // Função para fazer download do arquivo existente
  const handleDownload = () => {
    if (!existingFile) return

    // Caso seja File nativo
    if (existingFile instanceof File) {
      const url = URL.createObjectURL(existingFile)
      const a = document.createElement("a")
      a.href = url
      a.download = existingFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      return
    }

    // Caso seja objeto serializável { data }
    if (existingFile?.data) {
      const mime = existingFile.type || "application/octet-stream"
      const a = document.createElement("a")
      a.href = `data:${mime};base64,${existingFile.data}`
      a.download = existingFile.name || "arquivo"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  // Função para remover arquivo
  const handleRemove = () => {
    const fakeEvent = {
      target: {
        name,
        files: [],
        type: "file",
      },
    }
    onChange(fakeEvent)
  }

  // Função para obter o ícone baseado no tipo de arquivo
  const getFileIcon = (fileLike: any) => {
    const name = fileLike?.name as string | undefined
    if (!name) return FileText
    const ext = name.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "pdf":
      case "doc":
      case "docx":
      case "ppt":
      case "pptx":
      default:
        return FileText
    }
  }

  const hasExistingFile =
    !!existingFile && (existingFile instanceof File || typeof existingFile?.data === "string")
  const displayedName = (existingFile?.name as string) || fileName || "arquivo"
  const displayedSizeMB =
    existingFile?.size ? (existingFile.size / 1024 / 1024).toFixed(2) + " MB" : ""

  const FileIcon = getFileIcon(existingFile)

  return (
    <div>
      <label className="flex items-center text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Mostrar arquivo existente se houver */}
      {hasExistingFile && (
        <div className="mb-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <FileIcon className="h-6 w-6 text-green-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-400 truncate">{existingFile.name}</p>
                  <p className="text-xs text-green-300">{(existingFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleDownload}
                className="flex-shrink-0 text-xs bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
              >
                <Download className="h-3 w-3 mr-1" />
                Baixar
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleRemove}
                className="flex-shrink-0 text-xs bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
              >
                <X className="h-3 w-3 mr-1" />
                Remover
              </Button>
            </div>
          </div>
        </div>
      )}

      <label
        htmlFor={name}
        className="relative flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-border/50 p-4 md:p-6 text-center text-gray-400 hover:border-border cursor-pointer"
      >
        <Upload className="h-6 w-6 mb-2" />
        <span className="text-sm">
          {hasExistingFile ? "Clique para substituir o arquivo" : fileName || "Clique para selecionar o arquivo"}
        </span>
        <span className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX - Máx: 10MB</span>
      </label>
      <Input id={name} name={name} type="file" onChange={onChange} className="sr-only" accept=".pdf,.docx,.pptx" />
    </div>
  )
}

const ExperienceSelect = ({ label, name, value, onValueChange, icon: Icon, options, required = false }) => {
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="space-y-3">
          <label className="flex items-start text-sm font-medium leading-relaxed">
            <Icon className="h-4 w-4 mr-2 text-[#F9A51A] mt-0.5 flex-shrink-0" />
            <span className="flex-1">
              {label} {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal h-auto min-h-[48px] py-3 whitespace-normal bg-secondary/50 border-border"
            >
              {selectedLabel || "Selecione o requisito"}
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="bg-secondary border-border text-white">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <RadioGroup
            value={value}
            onValueChange={(val) => {
              onValueChange(name, val)
              setOpen(false)
            }}
            className="space-y-1"
          >
            {options.map((option) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className="flex items-center gap-4 rounded-md p-4 hover:bg-white/10 cursor-pointer"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <span className="flex-1 text-sm leading-relaxed">{option.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="space-y-3">
      <label className="flex items-start text-sm font-medium leading-relaxed">
        <Icon className="h-4 w-4 mr-2 text-[#F9A51A] mt-0.5 flex-shrink-0" />
        <span className="flex-1">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      <Select
        name={name}
        onValueChange={(selectedValue) => onValueChange(name, selectedValue)}
        value={value}
        required={required}
      >
        <SelectTrigger className="bg-secondary/50 border-border text-stone-400 h-auto min-h-[48px] py-3">
          <SelectValue placeholder="Selecione o requisito" className="whitespace-normal" />
        </SelectTrigger>
        <SelectContent className="max-w-[90vw] md:max-w-none">
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value} className="py-3 px-4">
              <div className="text-sm leading-relaxed whitespace-normal">{option.label}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function Step4ProfileAttachments({ data, update }) {
  const fileToBase64Client = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(",")[1]) // remove "data:mime/type;base64,"
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    const field = e.target.name

    if (!file) {
      update({ profile: { ...data, [field]: null } })
      return
    }

    // Validações
    const max = 10 * 1024 * 1024 // 10MB
    if (file.size > max) {
      alert(`Arquivo maior que 10MB (${(file.size / 1024 / 1024).toFixed(2)}MB).`)
      e.target.value = ""
      return
    }

    const allowed = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ])
    if (!allowed.has(file.type)) {
      alert("Tipos permitidos: PDF, DOC/DOCX, PPT/PPTX.")
      e.target.value = ""
      return
    }

    try {
      const base64 = await fileToBase64Client(file)
      update({
        profile: {
          ...data,
          [field]: {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64, // base64 sem prefixo
          } as SerializableFile,
        },
      })
    } catch (err) {
      console.error("Falha ao ler arquivo no client:", err)
      alert("Não foi possível processar o arquivo. Tente novamente.")
      e.target.value = ""
    }
  }

  const handleSelectChange = (name, value) => {
    update({ profile: { ...data, [name]: value } })
  }

  const experienceOptions = {
    vendas: [
      { value: "estrategico-persuasivo", label: "É um diferencial que o candidato seja estratégico e persuasivo." },
      { value: "confiante-eficaz", label: "É fundamental que seja confiante e eficaz na negociação." },
      { value: "roteiro-claro", label: "É suficiente que siga um roteiro de vendas com clareza." },
      { value: "sem-experiencia", label: "Não é exigida experiência prática prévia em vendas." },
      { value: "nao-prerequisito", label: "A habilidade com vendas não é um pré-requisito para este negócio." },
    ],
    marketing: [
      {
        value: "criativo-estrategico",
        label: "É desejável que seja criativo(a) e estratégico(a) para promover a marca.",
      },
      { value: "executar-campanhas", label: "É necessário que saiba executar campanhas para atrair clientes." },
      { value: "redes-sociais-basico", label: "Basta que utilize as redes sociais para o básico da divulgação." },
      { value: "suporte-sem-experiencia", label: "Oferecemos suporte para franqueados sem experiência em marketing." },
      { value: "nao-responsabilidade", label: "O marketing não é uma responsabilidade central do franqueado." },
    ],
    atendimento: [
      { value: "construir-relacionamentos", label: "O talento para construir relacionamentos é um diferencial chave." },
      { value: "paciente-eficaz", label: "É essencial que seja paciente e eficaz para solucionar problemas." },
      { value: "profissional-cortes", label: "É esperado que seja profissional e cortês com o público." },
      { value: "treinamento-conflitos", label: "O franqueado receberá treinamento para lidar com conflitos." },
      { value: "nao-foco-principal", label: "O contato direto com o público não é o foco principal da função." },
    ],
    operacoes: [
      { value: "otimizar-processos", label: "A capacidade de otimizar processos é muito valorizada." },
      { value: "gerenciar-multiplas", label: "É fundamental que saiba gerenciar múltiplas tarefas e prazos." },
      { value: "rotinas-organizadas", label: "É necessário que mantenha suas rotinas de trabalho organizadas." },
      { value: "execucao-tarefas", label: "A função é mais focada na execução de tarefas do que na gestão." },
      { value: "suporte-processos", label: "A organização pode ser desenvolvida com o suporte dos nossos processos." },
    ],
    financas: [
      { value: "visao-analitica", label: "Visão analítica para decisões financeiras é um grande diferencial." },
      { value: "disciplina-controle", label: "É necessário ter disciplina para o controle financeiro diário." },
      { value: "contas-basicas", label: "É suficiente que mantenha as contas básicas em ordem." },
      { value: "sem-analises-complexas", label: "Não é exigida experiência com análises financeiras complexas." },
      { value: "suporte-total", label: "A franqueadora oferece suporte total na gestão financeira." },
    ],
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-white">Perfil do Franqueado e Anexos</h2>

      <div className="p-4 md:p-6 border border-border/50 rounded-lg bg-black/20">
        <h3 className="text-lg font-semibold mb-6">Requisitos de Experiência do Franqueado</h3>
        <div className="space-y-6">
          <ExperienceSelect
            label="1. Vendas e Negociação - Qual o requisito para a área de VENDAS?"
            name="expVendas"
            value={data.expVendas}
            onValueChange={handleSelectChange}
            icon={TrendingUp}
            options={experienceOptions.vendas}
            required
          />
          <ExperienceSelect
            label="2. Marketing e Divulgação - Qual o requisito para a área de MARKETING?"
            name="expMarketing"
            value={data.expMarketing}
            onValueChange={handleSelectChange}
            icon={Megaphone}
            options={experienceOptions.marketing}
            required
          />
          <ExperienceSelect
            label="3. Atendimento e Relacionamento - Qual o requisito para a área de ATENDIMENTO ao CLIENTE?"
            name="expAtendimento"
            value={data.expAtendimento}
            onValueChange={handleSelectChange}
            icon={Smile}
            options={experienceOptions.atendimento}
            required
          />
          <ExperienceSelect
            label="4. Operações e Organização - Qual o requisito para a área de OPERAÇÕES?"
            name="expOperacoes"
            value={data.expOperacoes}
            onValueChange={handleSelectChange}
            icon={Settings}
            options={experienceOptions.operacoes}
            required
          />
          <ExperienceSelect
            label="5. Gestão Financeira - Qual o requisito para a área FINANCEIRA?"
            name="expFinancas"
            value={data.expFinancas}
            onValueChange={handleSelectChange}
            icon={Banknote}
            options={experienceOptions.financas}
            required
          />
        </div>
      </div>

      <div className="p-4 md:p-6 border border-border/50 rounded-lg bg-black/20">
        <h3 className="text-lg font-semibold mb-4">Anexos</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <FileInput
            label="Anexo COF (Circular de Oferta de Franquia)"
            name="cofFile"
            onChange={handleFileChange}
            fileName={data.cofFile?.name}
            existingFile={data.cofFile}
            required={true}
          />
          <FileInput
            label="Anexo Apresentação da Marca"
            name="presentationFile"
            onChange={handleFileChange}
            fileName={data.presentationFile?.name}
            existingFile={data.presentationFile}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          O anexo COF é obrigatório. A apresentação da marca é opcional, mas recomendada para uma apresentação mais
          completa da sua franquia.
        </p>
      </div>
    </div>
  )
}
