"use client"

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { FranchiseOnboardingForm } from "@/components/franchise-onboarding-form";
import { validateOnboardingToken } from "@/app/franchise/onboarding/actions";
import { Card, CardContent } from "@/components/ui/card";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'invalid_token' | 'invalid' | 'completed' | 'valid'>('loading');
  const [message, setMessage] = useState("Validando seu acesso...");
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!token) {
      setStatus('invalid_token');
      setMessage("Para preencher o onboarding, você precisa de um token de acesso válido na URL.");
      return;
    }

    const validate = async () => {
      const result = await validateOnboardingToken(token);
      if (result.success) {
        setStatus(result.data.response); // 'valid', 'completed', ou 'invalid'
        if (result.data.response === 'valid') {
          setInitialData({
            ...result.data, // Passa todos os dados retornados
            token: token,
          });
        } else if (result.data.response === 'completed') {
          setMessage("Este cadastro já foi finalizado. Obrigado!");
        } else {
          setMessage("Seu token é inválido ou já expirou. Por favor, solicite um novo link.");
        }
      } else {
        setStatus('invalid');
        setMessage(result.message);
      }
    };

    validate();
  }, [token]);

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return <StatusDisplay icon={Loader2} title="Aguarde..." message={message} spin />;
      case 'invalid_token':
      case 'invalid':
        return <StatusDisplay icon={AlertTriangle} title="Acesso Negado" message={message} isError />;
      case 'completed':
        return <StatusDisplay icon={CheckCircle} title="Cadastro Concluído" message={message} />;
      case 'valid':
        return <FranchiseOnboardingForm initialData={initialData} />;
      default:
        return <StatusDisplay icon={AlertTriangle} title="Erro" message="Ocorreu um erro inesperado." isError />;
    }
  };

  return (
    <div className="min-h-screen w-full dark-gradient-background text-gray-200 font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-800/50 bg-transparent">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <a href="/">
            <Image src="/franchise-logo.svg" alt="Franchise Store Logo" width={170} height={38} />
          </a>
        </div>
      </header>
      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {renderStatus()}
        </div>
      </main>
    </div>
  );
}

const StatusDisplay = ({ icon: Icon, title, message, spin = false, isError = false }) => (
  <div className="flex justify-center items-center py-20">
    <Card className="w-full max-w-lg bg-secondary/30 border-border text-white">
      <CardContent className="p-8 text-center">
        <Icon className={`h-12 w-12 mx-auto mb-6 ${isError ? 'text-red-500' : 'text-[#F9A51A]'} ${spin ? 'animate-spin' : ''}`} />
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  </div>
);

export default function OnboardingPage() {
  return (
    <Suspense fallback={<StatusDisplay icon={Loader2} title="Carregando..." message="Aguarde um momento..." spin />}>
      <OnboardingContent />
    </Suspense>
  );
}
