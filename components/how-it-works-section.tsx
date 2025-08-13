import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { AnimatedWrapper } from "./animated-wrapper"

const scrollToForm = () => {
  const elemento = document.getElementById('formulario-cadastro')
  if (elemento) {
    // Scroll com offset personalizado
    const offsetTop = elemento.offsetTop - 80 // 80px para header fixo
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const StepBlock = ({
  stepNumber,
  title,
  items,
  imageUrl,
  imageAlt,
  stepColor,
  delay = 0
}: {
  stepNumber: string
  title: string
  items: string[]
  imageUrl: string
  imageAlt: string
  stepColor: string
  delay?: number
}) => (
  <AnimatedWrapper delay={delay} className="w-full">
    <div className="bg-secondary/30 border border-border rounded-2xl p-6 md:p-8 h-full">
      {/* Header do Step */}
      <div className="text-center mb-6">
        <p 
          className="text-sm font-bold tracking-widest mb-2"
          style={{ color: stepColor }}
        >
          {stepNumber}
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
          {title}
        </h3>
      </div>

      {/* Imagem */}
      <div className="mb-6 flex justify-center">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            width={400}
            height={300}
            className="rounded-lg object-contain w-full"
          />
      </div>

      {/* Lista de itens */}
      <ul className="space-y-3 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Check className="h-4 w-4" style={{ color: stepColor }} />
            </div>
            <span className="text-muted-foreground text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </AnimatedWrapper>
)

export function HowItWorksSection() {
  const steps = [
    {
      stepNumber: "PASSO 01",
      title: "Você responde perguntas que realmente importam",
      items: [
        "Perguntas focadas nos fatores-chave do seu sucesso",
        "Questionário estratégico que vai além de dados básicos",
        "Avaliação de objetivos de investimento e experiência",
        "Criação de um perfil fiel do seu estilo de empreendedor",
      ],
      imageUrl: "https://trunk.v4kuri.com.br/media/user_files/EsbnKCcnz9HHbHAnJLtkVfQHsRwdbvgE_18fb99d298c0e3797de4cc96ff12eb5a371555f2057ad958aaf848a1f99bd944.svg",
      imageAlt: "Interface de questionário inteligente",
      stepColor: "#F9A51A", // Laranja
    },
    {
      stepNumber: "PASSO 02", 
      title: "Nosso sistema analisa centenas de marcas com dados reais",
      items: [
        "Ativação instantânea do algoritmo FS Score®",
        "Análise de centenas de marcas com +12.000 perfis reais",
        "Cruzamento de dados objetivos para compatibilidade exata",
        "Filtragem automática das franquias ideais para você",
      ],
      imageUrl: "https://trunk.v4kuri.com.br/media/user_files/LtigxOTU1Mraa1uPdAI7G9xnQQ2xID0w_b29b207356dfe80400847aae0fab6c5adfd276a084de0d1bade6ea58135df85b.svg",
      imageAlt: "Painel de análise com IA",
      stepColor: "#22C55E", // Verde
    },
    {
      stepNumber: "PASSO 03",
      title: "Você recebe um relatório completo em tempo real",
      items: [
        "Resultado em poucos minutos na sua tela",
        "Até 8 franquias alinhadas ao seu perfil",
        "Ranking por afinidade e compatibilidade",
        "Detalhamento completo de cada franquia",
      ],
      imageUrl: "https://trunk.v4kuri.com.br/media/user_files/MhXL9JcrL2trUaAgFiLxaT88uMtulRMc_b178fc0525bb7d4defe9cc368dd7e3efed737f37d8b4e91e88255a741ec44b14.svg",
      imageAlt: "Relatório detalhado de resultados",
      stepColor: "#f91a91", // Rosa/Vermelho
    }
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header da seção */}
        <AnimatedWrapper className="text-center mb-12 md:mb-16">
          <h3 className="text-base font-semibold text-[#F9A51A] tracking-wider uppercase mb-4">
            Nossa solução
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white text-balance max-w-4xl mx-auto">
            Como funciona
          </h2>
        </AnimatedWrapper>

        {/* Grid de 3 blocos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {steps.map((step, index) => (
            <StepBlock 
              key={step.title} 
              {...step} 
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA Final */}
        <AnimatedWrapper delay={0.4} className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#F9A51A] to-[#F9821A] text-stone-950 font-bold text-md h-14 px-10 hover:opacity-90 transition-opacity"
            onClick={scrollToForm}
          >
            Começar minha análise agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            100% gratuito
          </p>
        </AnimatedWrapper>
      </div>
    </section>
  )
}
