"use client"

import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusCircle,
  Trash2,
  Store,
  DollarSign,
  Percent,
  TrendingUp,
  Calendar,
  Users,
  Upload,
  ImageIcon,
  Download,
  Check,
  X,
  Eye,
} from "lucide-react"
import { CurrencyMaskedInput } from "@/components/currency-masked-input"

const newModelTemplate = {
  nome: "",
  tipo: "",
  investimento: "",
  taxaFranquia: "",
  royalties: "",
  fundoPropaganda: "",
  faturamentoMedio: "",
  lucratividadeMediaMin: "",
  lucratividadeMediaMax: "",
  prazoRetornoMin: "",
  prazoRetornoMax: "",
  capitalGiro: "",
  funcionarios: "",
  foto: null,
}

const FileInput = ({ name, onChange, fileName, existingFile }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  // Criar URL da imagem quando existir um arquivo
  React.useEffect(() => {
    if (existingFile && existingFile instanceof File) {
      const url = URL.createObjectURL(existingFile)
      setImageUrl(url)

      // Cleanup da URL quando o componente for desmontado
      return () => URL.revokeObjectURL(url)
    } else {
      setImageUrl(null)
    }
  }, [existingFile])

  // Função para fazer download da foto existente
  const handleDownload = () => {
    if (existingFile && existingFile instanceof File) {
      const url = URL.createObjectURL(existingFile)
      const a = document.createElement("a")
      a.href = url
      a.download = existingFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  // Função para remover a foto
  const handleRemove = () => {
    // Simular um evento de mudança com arquivo vazio
    const fakeEvent = {
      target: {
        name: name,
        files: [],
        type: "file",
      },
    }
    onChange(fakeEvent)
  }

  // Função para validar o arquivo antes de aceitar
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      // Verificar tamanho do arquivo (1.5MB = 1.5 * 1024 * 1024 bytes)
      const maxSize = 1.5 * 1024 * 1024 // 1.5MB em bytes

      if (file.size > maxSize) {
        alert(`A imagem deve ter no máximo 1.5MB. O arquivo selecionado tem ${(file.size / 1024 / 1024).toFixed(2)}MB.`)
        // Limpar o input
        e.target.value = ""
        return
      }

      // Verificar tipo do arquivo
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
      if (!allowedTypes.includes(file.type)) {
        alert("Por favor, selecione apenas arquivos PNG ou JPG.")
        e.target.value = ""
        return
      }
    }

    // Se passou nas validações, chamar o onChange original
    onChange(e)
  }

  return (
    <div>
      <label className="flex items-center text-sm font-medium mb-2">
        <ImageIcon className="h-4 w-4 mr-2 text-[#F9A51A]" />
        Foto do Modelo (Opcional)
      </label>

      {/* Mostrar imagem existente se houver */}
      {existingFile && imageUrl && (
        <div className="mb-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="space-y-3">
            {/* Preview da imagem */}
            <div className="relative">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Preview do modelo"
                className="w-full h-32 object-cover rounded-lg border border-green-500/30"
              />
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
              >
                <Eye className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Informações do arquivo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-green-400">{existingFile.name}</p>
                  <p className="text-xs text-green-300">{(existingFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleDownload}
                  className="text-xs bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Baixar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleRemove}
                  className="text-xs bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                >
                  <X className="h-3 w-3 mr-1" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <label
        htmlFor={name}
        className="relative flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-border/50 p-4 text-center text-gray-400 hover:border-border cursor-pointer"
      >
        <Upload className="h-5 w-5 mb-1" />
        <span className="text-xs">
          {existingFile ? "Clique para substituir a imagem" : fileName || "Clique para selecionar a imagem"}
        </span>
        <span className="text-xs text-muted-foreground mt-1">PNG, JPG - Máx: 1.5MB</span>
      </label>
      <Input
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        className="sr-only"
        accept="image/png, image/jpeg, image/jpg"
      />

      {/* Modal de preview da imagem */}
      {showPreview && imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Preview ampliado"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const StoreModelCard = ({ model, index, handleModelChange, handleSelectChange, removeModel }) => (
  <div className="space-y-6 p-6 border border-border/50 rounded-lg bg-black/20 relative">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-[#F9A51A]">
        Modelo {index + 1}: {model.nome || "Novo Modelo"}
      </h3>
      <Button type="button" variant="destructive" size="icon" onClick={() => removeModel(index)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <Store className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Nome do Modelo <span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          name="nome"
          value={model.nome}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="Ex: Loja Padrão, Quiosque Express"
          required
          className="bg-secondary/50 border-border"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <Store className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Tipo de Modelo <span className="text-red-500 ml-1">*</span>
        </label>
        <Select
          name="tipo"
          onValueChange={(value) => handleSelectChange(index, "tipo", value)}
          value={model.tipo}
          required
        >
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="loja-fisica">Loja Física</SelectItem>
            <SelectItem value="quiosque">Quiosque</SelectItem>
            <SelectItem value="home-based">Home-based</SelectItem>
            <SelectItem value="food-truck">Food Truck</SelectItem>
            <SelectItem value="container">Container</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <DollarSign className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Investimento a partir de <span className="text-red-500 ml-1">*</span>
        </label>
        <CurrencyMaskedInput
          name="investimento"
          value={model.investimento}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="R$ 0,00"
          required
          className="bg-secondary/50 border-border"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <DollarSign className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Taxa de Franquia <span className="text-red-500 ml-1">*</span>
        </label>
        <CurrencyMaskedInput
          name="taxaFranquia"
          value={model.taxaFranquia}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="R$ 0,00"
          required
          className="bg-secondary/50 border-border"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <Percent className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Royalties <span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          name="royalties"
          value={model.royalties}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="Ex: 5% do faturamento, R$ 500 fixo"
          required
          className="bg-secondary/50 border-border"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <Percent className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Fundo de Propaganda
        </label>
        <Input
          name="fundoPropaganda"
          value={model.fundoPropaganda}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="Ex: 2% do faturamento, R$ 200 fixo"
          className="bg-secondary/50 border-border"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <TrendingUp className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Faturamento Médio Mensal <span className="text-red-500 ml-1">*</span>
        </label>
        <CurrencyMaskedInput
          name="faturamentoMedio"
          value={model.faturamentoMedio}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="R$ 0,00"
          required
          className="bg-secondary/50 border-border"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <TrendingUp className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Lucratividade Média (%) <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center gap-4">
          <Input
            name="lucratividadeMediaMin"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={model.lucratividadeMediaMin}
            onChange={(e) => handleModelChange(index, e)}
            placeholder="Mín %"
            required
            className="bg-secondary/50 border-border"
          />
          <span>-</span>
          <Input
            name="lucratividadeMediaMax"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={model.lucratividadeMediaMax}
            onChange={(e) => handleModelChange(index, e)}
            placeholder="Máx %"
            required
            className="bg-secondary/50 border-border"
          />
        </div>
      </div>
    </div>
    <div>
      <label className="flex items-center text-sm font-medium mb-1">
        <Calendar className="h-4 w-4 mr-2 text-[#F9A51A]" />
        Prazo de Retorno (meses) <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="flex items-center gap-4">
        <Input
          name="prazoRetornoMin"
          type="number"
          min="1"
          placeholder="Mínimo (ex: 12)"
          value={model.prazoRetornoMin}
          onChange={(e) => handleModelChange(index, e)}
          required
          className="bg-secondary/50 border-border"
        />
        <span>-</span>
        <Input
          name="prazoRetornoMax"
          type="number"
          min="1"
          placeholder="Máximo (ex: 18)"
          value={model.prazoRetornoMax}
          onChange={(e) => handleModelChange(index, e)}
          required
          className="bg-secondary/50 border-border"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <DollarSign className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Capital de Giro Sugerido
        </label>
        <CurrencyMaskedInput
          name="capitalGiro"
          value={model.capitalGiro}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="R$ 0,00"
          className="bg-secondary/50 border-border"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium mb-1">
          <Users className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Funcionários Necessários <span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          name="funcionarios"
          type="number"
          min="0"
          value={model.funcionarios}
          onChange={(e) => handleModelChange(index, e)}
          placeholder="Ex: 3"
          required
          className="bg-secondary/50 border-border"
        />
      </div>
    </div>
    <FileInput
      name={`foto-${index}`}
      onChange={(e) => handleModelChange(index, e)}
      fileName={model.foto?.name}
      existingFile={model.foto}
    />
  </div>
)

export function Step3StoreModels({ data, update }) {
  const handleModelChange = (index, e) => {
    const { name, value, type, files } = e.target

    const newModels = [...data]

    if (type === "file") {
      // Para arquivos de foto dos modelos, usar o nome sem o índice
      const fieldName = name.startsWith("foto-") ? "foto" : name
      // Verificar se há arquivos selecionados
      if (files && files.length > 0) {
        newModels[index][fieldName] = files[0]
      } else {
        // Se não há arquivos (remoção), definir como null
        newModels[index][fieldName] = null
      }
    } else {
      // Validações para campos numéricos
      if (["lucratividadeMediaMin", "lucratividadeMediaMax"].includes(name)) {
        const numValue = Number.parseFloat(value)
        if (value !== "" && (numValue < 0 || numValue > 100)) return
      }

      if (["prazoRetornoMin", "prazoRetornoMax", "funcionarios"].includes(name)) {
        const numValue = Number.parseInt(value)
        if (value !== "" && numValue < 0) return
      }

      newModels[index][name] = value
    }

    update({ storeModels: newModels })
  }

  const handleSelectChange = (index, name, value) => {
    const newModels = [...data]
    newModels[index][name] = value
    update({ storeModels: newModels })
  }

  const addModel = () => {
    update({ storeModels: [...data, { ...newModelTemplate }] })
  }

  const removeModel = (index) => {
    const newModels = data.filter((_, i) => i !== index)
    update({ storeModels: newModels })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Modelos de negócio</h2>
      <p className="text-lg text-muted-foreground">
        Os detalhes dos seus modelos de negócios é um critério fundamental para conectar sua marca com matchs
        compatíveis
      </p>

      {data.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-border/50 rounded-lg">
          <p className="text-muted-foreground mb-4">Nenhum modelo de loja adicionado.</p>
          <Button
            type="button"
            variant="outline"
            onClick={addModel}
            className="hover:bg-amber-600 hover:text-white bg-amber-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Primeiro Modelo
          </Button>
        </div>
      )}

      {data.map((model, index) => (
        <StoreModelCard
          key={index}
          model={model}
          index={index}
          handleModelChange={handleModelChange}
          handleSelectChange={handleSelectChange}
          removeModel={removeModel}
        />
      ))}

      {data.length > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={addModel}
          className="w-full border-dashed bg-amber-500 hover:bg-amber-600 hover:text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Outro Modelo
        </Button>
      )}
    </div>
  )
}
