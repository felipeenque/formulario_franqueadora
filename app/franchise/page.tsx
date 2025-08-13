"use client"

import { useEffect } from 'react'
import Image from "next/image"
import { ShieldCheck, Target, CheckCircle } from 'lucide-react'
import { FranchisorForm } from "@/components/franchisor-form"
import { AnimatedWrapper } from "@/components/animated-wrapper"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': any
    }
  }
}

export default function FranchisePage() {
  useEffect(() => {
    const scriptId = 'lite-youtube-embed'
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'module'
    script.src = 'https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js'
    document.head.appendChild(script)

    return () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="w-full dark-gradient-background text-gray-200 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-800/50 bg-transparent">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <a href="/">
            <Image src="/franchise-logo.svg" alt="Franchise Store Logo" width={170} height={38} />
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>Expansão Segura</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
              <Target className="h-4 w-4 text-green-500" />
              <span>Candidatos Qualificados</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Processo Transparente</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Form Section */}
        <section id="franchisor-form" className="py-16 md:py-24 bg-black/20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedWrapper>
              <FranchisorForm />
            </AnimatedWrapper>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-transparent">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Franchise Store. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Termos de Serviço
            </a>
            <a href="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-white transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
