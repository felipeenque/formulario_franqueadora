import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedWrapper } from "./animated-wrapper"

const faqData = [
  {
    question: "O que é a Franchise Store?",
    answer:
      "A Franchise Store é uma empresa especializada em expansão de franquias e seleção de candidatos de qualidade. Uma empresa pertencente ao grupo Cherto e a V4 Company, que levam força de marca e credibilidade no mundo de franquias. Somos especialistas em franquias! Em nossos projetos focamos em ambas as vias do mercado, ajudando e impulsionando franquias de todo o Brasil em seu processo de expansão e Auxiliando empreendedores a adquirirem suas franquias de forma mais assertiva e segura.",
  },
  {
    question: "O serviço é gratuito para o candidato?",
    answer:
      "Sim, nossa ferramenta de análise e match é 100% gratuita para os empreendedores.",
  },
  {
    question: "Quanto tempo leva para preencher o questionário completo?",
    answer:
      "Em média, leva de 5 a 10 minutos para responder todas as perguntas de forma completa e detalhada.",
  },
  {
    question: "Posso salvar o questionário e continuar depois?",
    answer:
      "Sim, a partir do momento que você começa o questionário, você pode sair e continuar depois que suas respostas estarão salvas",
  },
  {
    question: "O que significa a pontuação de compatibilidade?",
    answer:
      "A pontuação indica o quão bem uma franqueadora se alinha ao seu perfil e objetivos. Quanto maior a pontuação, maior a compatibilidade.",
  },
  {
    question: "Vou ter acesso a informações exclusivas das franqueadoras?",
    answer:
      "Sim, você terá acesso a informações exclusivas das franqueadoras que estão disponíveis apenas através da Franchise Store.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Levamos a segurança e a privacidade dos seus dados muito a sério. Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança para proteger suas informações.",
  },
  {
    question: "Preciso ter experiência prévia para usar a plataforma?",
    answer:
      "Não. Nossa plataforma foi desenhada para todos os perfis de empreendedores, desde os mais experientes até aqueles que estão começando sua primeira jornada de negócios.",
  },
]

export function FaqSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedWrapper className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">Perguntas Frequentes</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-balance">
            Tudo o que você precisa saber para começar com o pé direito.
          </p>
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  )
}
