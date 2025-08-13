import React from 'react'

// Dados de exemplo das franquias/marcas
const franchises = [
  { name: "Capricho", logo: "https://franquia.com.br/wp-content/uploads/2025/01/cropped-CAPRICHO-768x220.png" },
  { name: "Lugano", logo: "https://chocolatelugano.com.br/wp-content/uploads/2024/09/logo-1-1024x549.webp" },
  { name: "Market4u", logo: "https://i0.wp.com/market4u.com.br/wp-content/uploads/2023/01/4cf0jsa3d2z.png?w=700&ssl=1" },
  { name: "Kopenhagen", logo: "https://kopenhagen21.vtexassets.com/assets/vtex/assets-builder/kopenhagen21.store-theme/6.1.15/icons/header/header-logo___9f5db40a6e01008ffd37ec76c533d3bc.svg" },
  { name: "Solar 21", logo: "https://solar21.com.br/static/images/logo-white.svg" },
  { name: "Valoriq", logo: "https://valoriq.com.br/wp-content/uploads/2024/05/logo2-site.png" },
  { name: "Pizza Cesar", logo: "https://franquia.com.br/wp-content/uploads/2024/04/logo-pizza-cesar-destaque.png" },
  { name: "Clube Melissa", logo: "https://franquia.com.br/wp-content/uploads/2024/11/d2cm-logo-melissa.svg" },
]

export function InfiniteCarousel() {
  // Duplicamos o array para criar o efeito infinito
  const duplicatedFranchises = [...franchises, ...franchises]

  return (
    <section className="bg-gradient-to-b from-transparent to-stone-950/20">
      <div className="container mx-auto"> 
        {/* Container do carrossel com overflow hidden */}
        <div className="relative w-full overflow-hidden">
          {/* Gradientes de fade nas bordas */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-stone-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-stone-950 to-transparent z-10 pointer-events-none"></div>
          
          {/* Container do carrossel em movimento */}
          <div className="carousel-container flex gap-8 md:gap-12 lg:gap-16">
            {duplicatedFranchises.map((franchise, index) => (
              <div
                key={`${franchise.name}-${index}`}
                className="carousel-item flex-shrink-0 w-32 h-16 flex items-center justify-center transition-all duration-300"
              >
                <img
                  src={franchise.logo}
                  alt={`${franchise.name} logo`}
                  className="max-w-full max-h-full object-contain px-4 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          animation: scroll 30s linear infinite;
          width: max-content;
        }

        .carousel-container:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Responsivo - velocidade diferente no mobile */
        @media (max-width: 768px) {
          .carousel-container {
            animation: scroll 20s linear infinite;
          }
        }

        /* Pausa a animação ao passar o mouse */
        .carousel-item:hover ~ .carousel-container,
        .carousel-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

// Versão alternativa com Tailwind puro (sem styled-jsx)
export function InfiniteCarouselTailwind() {
  const duplicatedFranchises = [...franchises, ...franchises]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-transparent to-stone-900/20">
      <div className="container mx-auto px-4">
        <div className="relative w-full overflow-hidden">
          {/* Gradientes de fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-stone-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-stone-900 to-transparent z-10 pointer-events-none"></div>
          {/* Carrossel */}
          <div className="flex gap-8 md:gap-12 lg:gap-16 animate-scroll hover:pause">
            {duplicatedFranchises.map((franchise, index) => (
              <div
                key={`${franchise.name}-${index}`}
                className="flex-shrink-0 w-32 md:w-40 lg:w-48 h-16 md:h-20 lg:h-24 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <img
                  src={franchise.logo}
                  alt={`${franchise.name} logo`}
                  className="max-w-full max-h-full object-contain px-4 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
