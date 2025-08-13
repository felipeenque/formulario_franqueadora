import { X, Check } from "lucide-react"
import { AnimatedWrapper } from "./animated-wrapper"

// Versão alternativa mais compacta
export function TiredOfSectionCompact() {
  const problems = [
    "Pesquisar sem rumo e sem resultados?",
    "Receber propostas genéricas?", 
    "Medo de escolher errado?",
    "Incerteza sobre retorno real?"
  ]

  const promises = [
    "Análise com 47 critérios objetivos",
    "Recomendações ultra-personalizadas",
    "Dados financeiros transparentes",
    "Suporte especializado completo"
  ]

  return (
    <AnimatedWrapper delay={0.3}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        {/* Coluna 1 - Cansado de */}
        <div className="text-center md:text-left lg:text-left">
          <p className="text-red-500 font-semibold text-sm mb-3">CANSADO DE:</p>
          <ul className="space-y-1 flex flex-col items-center md:items-start">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start gap-3 justify-center md:justify-start">
                <X className="h-3 w-3 text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-xs leading-relaxed">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 2 - Nossa Promessa */}
        <div className="text-center md:text-left lg:text-left">
          <p className="text-green-500 font-semibold text-sm mb-3">NOSSA PROMESSA:</p>
          <ul className="space-y-1 flex flex-col items-center md:items-start">
            {promises.map((promise, index) => (
              <li key={index} className="flex items-start gap-3 justify-center md:justify-start">
                <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-xs leading-relaxed">{promise}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedWrapper>
  )
}
