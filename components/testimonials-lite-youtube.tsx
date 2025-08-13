"use client"

import { useEffect } from 'react'
import { AnimatedWrapper } from '@/components/animated-wrapper'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': any
    }
  }
}

const testimonials = [
  {
    name: "Viviane",
    quote: "O dinheiro mais bem pago da minha vida, foi a Franchise Store",
    videoId: "J5nvglbvwlc", // Substitua pelo ID real do vídeo
  },
  {
    name: "Natália", 
    quote: "A agilidade no processo foi um ponto extremamente positivo",
    videoId: "b00hZQ3kmqY", // Substitua pelo ID real do vídeo
  },
  {
    name: "Wesley",
    quote: "Eu fechei com os nomes cotados da primeira seleção que vocês fizeram",
    videoId: "dwhuCUo72kk", // Substitua pelo ID real do vídeo
  }
]

export function TestimonialsWithYoutube() {
  useEffect(() => {
    // Carrega o script do lite-youtube
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js'
    document.head.appendChild(script)

    return () => {
      // Remove o script quando o componente é desmontado
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedWrapper>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance">
                Você não está sozinho nessa jornada.
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-balance text-muted-foreground text-base">
                Milhares de empreendedores brasileiros já passaram por essas mesmas dúvidas e medos. Ouvimos cada
                história e entendemos a sua dor.
              </p>
            </AnimatedWrapper>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <AnimatedWrapper delay={0.1}>
                <div className="rounded-xl border border-border bg-secondary/30 p-8 flex flex-col items-center text-center h-full">
                  <div className="w-full h-48 md:h-56 mb-6 overflow-hidden rounded-lg">
                  <lite-youtube
                    videoid={testimonials[0].videoId}
                    videotitle={`Depoimento de ${testimonials.name}`}
                    videoPlay="Assista agora"
                    posterquality="hqdefault"
                    posterloading="lazy"
                    nocookie
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                  <h3 className="text-xl font-bold text-white">Viviane</h3>
                  <p className="mt-4 text-muted-foreground font-extralight">
                    "O dinheiro mais bem pago da minha vida, foi a Franchise Store"
                  </p>
                </div>
              </AnimatedWrapper>
              <AnimatedWrapper delay={0.2}>
                <div className="rounded-xl border border-border bg-secondary/30 p-8 flex flex-col items-center text-center h-full">
                <div className="w-full h-48 md:h-56 mb-6 overflow-hidden rounded-lg">
                <lite-youtube
                    videoid={testimonials[1].videoId}
                    videotitle={`Depoimento de ${testimonials.name}`}
                    videoPlay="Assista agora"
                    posterquality="hqdefault"
                    posterloading="lazy"
                    nocookie
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px'
                    }}
                  />
                  </div>
                  <h3 className="text-xl font-bold text-white">Natália</h3>
                  <p className="mt-4 text-muted-foreground font-extralight">
                    "A agilidade no processo foi um ponto extremamente positivo"
                  </p>
                </div>
              </AnimatedWrapper>
              <AnimatedWrapper delay={0.3}>
                <div className="rounded-xl border border-border bg-secondary/30 p-8 flex flex-col items-center text-center h-full">
                <div className="w-full h-48 md:h-56 mb-6 overflow-hidden rounded-lg">
                <lite-youtube
                    videoid={testimonials[2].videoId}
                    videotitle={`Depoimento de ${testimonials.name}`}
                    videoPlay="Assista agora"
                    posterquality="hqdefault"
                    posterloading="lazy"
                    nocookie
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px'
                    }}
                  />
                  </div>
                  <h3 className="text-xl font-bold text-white">Wesley</h3>
                  <p className="mt-4 text-muted-foreground font-extralight">
                    "Eu fechei com os nomes cotados da primeira seleção que vocês fizeram"
                  </p>
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </section>
  )
}

export default TestimonialsWithYoutube
