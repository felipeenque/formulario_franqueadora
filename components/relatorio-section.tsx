// COPIE ESTE CÓDIGO E ADICIONE NA SUA PÁGINA

"use client"

import { useState } from "react"
import { ArrowRight, DollarSign, TrendingUp, X, Lock } from "lucide-react"

// Componente do Modal
const FranchiseDetailsModal = ({ isOpen, onClose, franchise }) => {
  if (!isOpen) return null;

  const financialData = [
    { label: "Investimento Inicial", value: "R$ 45.000 - R$ 85.000" },
    { label: "Taxa de Franquia", value: "R$ 25.000" },
    { label: "Capital de Giro", value: "R$ 15.000 - R$ 30.000" },
    { label: "Faturamento Médio Mensal", value: "R$ 35.000 - R$ 60.000" },
    { label: "Lucro Médio Mensal", value: "R$ 8.000 - R$ 15.000" },
    { label: "Prazo de Retorno", value: "18 - 24 meses" },
    { label: "Royalties", value: "6% do faturamento" },
    { label: "Taxa de Marketing", value: "2% do faturamento" },
    { label: "Área Mínima", value: "40m² - 80m²" },
    { label: "Funcionários", value: "3 - 6 pessoas" },
    { label: "Treinamento", value: "2 semanas" },
    { label: "Suporte", value: "Completo" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden bg-stone-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Background Table (Blurred) */}
        <div className="absolute inset-8 overflow-hidden rounded-xl">
          <div className="bg-stone-900 p-6 h-full blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Informações Financeiras - {franchise.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialData.map((item, index) => (
                <div key={index} className="bg-stone-900 rounded-lg p-4">
                  <div className="text-gray-300 text-sm font-medium">{item.label}</div>
                  <div className="text-white text-lg font-semibold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 space-y-4">
              <div className="bg-stone-900 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Perfil do Franqueado Ideal</h4>
                <p className="text-gray-300 text-sm">
                  Pessoa física ou jurídica com experiência em gestão, disponibilidade para dedicação exclusiva
                  e capital disponível conforme investimento inicial.
                </p>
              </div>
              
              <div className="bg-stone-900 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Diferenciais da Franquia</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Marca consolidada no mercado</li>
                  <li>• Produtos de alta qualidade</li>
                  <li>• Suporte operacional completo</li>
                  <li>• Marketing nacional</li>
                  <li>• Treinamento especializado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Message */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="backdrop-blur-md rounded-2xl p-8 text-center border shadow-2xl bg-stone-950 border-stone-700">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-orange-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Conteúdo Bloqueado
            </h3>
            
            <p className="mb-6 max-w-md text-muted-foreground">
              Estas informações detalhadas são liberadas após realizar o teste de compatibilidade.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  // Scroll para o formulário
                  onClose();
                  const elemento = document.getElementById('formulario-cadastro');
                  if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
              >
                Fazer Teste de Compatibilidade
              </button>
              
              <button 
                onClick={onClose}
                className="backdrop-blur-md rounded-2xl p-8 text-center border shadow-2xl bg-stone-950 border-stone-800 mx-0 py-4"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente do Card
const FranchiseCard = ({ 
  logo, 
  title, 
  category, 
  percentage, 
  investmentRange, 
  returnRange 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const franchiseData = {
    logo,
    title,
    category,
    percentage,
    investmentRange,
    returnRange
  };

  return (
    <>
      <div className="bg-sencondary/50 border rounded-2xl p-6 text-white w-full max-w-sm mx-auto border bg-neutral-900 border-neutral-800">
        {/* Header com logo, título e círculo de progresso */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Logo circular */}
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                    <img 
                      src={franchiseData.logo} 
                      alt={`${franchiseData.title} logo`}
                      className="w-full h-full object-contain p-1 blur-sm"
                      onError={(e) => {
                        // Se a imagem não carregar, mostra as iniciais
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'flex'
                      }}
                    />
                    <div 
                      className="w-full h-full bg-black rounded-full hidden items-center justify-center"
                      style={{display: 'none'}}
                    >
                      <span className="text-white font-bold text-sm">
                        {franchiseData.title.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>
            
            {/* Título e categoria */}
            <div>
              <h3 className="text-xl font-semibold text-white blur-sm">{title}</h3>
              <p className="text-muted-foreground text-sm">{category}</p>
            </div>
          </div>
          
          {/* Círculo de progresso */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
              {/* Círculo de fundo */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgb(75, 85, 99)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Círculo de progresso */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgb(34, 197, 94)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-in-out"
              />
            </svg>
            {/* Número da porcentagem no centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-green-400 text-lg font-bold">{percentage}</span>
            </div>
          </div>
        </div>
        
        {/* Seções de informação */}
        <div className="space-y-4 mb-8">
          {/* Investimento */}
          <div className="flex items-center justify-between rounded-xl p-4 bg-stone-950">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-orange-400" />
              <span className="text-white text-sm">Investimento</span>
            </div>
            <span className="text-gray-300 text-sm">{investmentRange}</span>
          </div>
          
          {/* Retorno médio */}
          <div className="flex items-center justify-between rounded-xl p-4 bg-stone-950">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span className="text-white text-sm">Retorno médio</span>
            </div>
            <span className="text-gray-300 text-sm">{returnRange}</span>
          </div>
        </div>
        
        {/* Botão que abre o modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-gray-900 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Ver detalhes da marca
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Modal */}
      <FranchiseDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        franchise={franchiseData}
      />
    </>
  );
};

// ADICIONE ESTA SEÇÃO NA SUA PÁGINA
export function FranchiseCardsSection() {
  const franchiseData = [
    {
      logo: "https://kopenhagen21.vtexassets.com/assets/vtex/assets-builder/kopenhagen21.store-theme/6.1.15/icons/header/header-logo___9f5db40a6e01008ffd37ec76c533d3bc.svg",
      title: "Kopenhagen",
      category: "Alimentação",
      percentage: 91,
      investmentRange: "R$ 150.000",
      returnRange: "De 10% a 15%"
    },
    {
      logo: "https://i0.wp.com/market4u.com.br/wp-content/uploads/2023/01/4cf0jsa3d2z.png?w=700&ssl=1",
      title: "Market4u",
      category: "Serviços e Outros Negócios",
      percentage: 83,
      investmentRange: "R$ 200.000",
      returnRange: "De 12% a 18%"
    }
  ];

  return (
    <section className="bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-balance text-white mb-4">
            Aqui está o que você vai receber
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Você receberá acesso imediato às franquias mais compatíveis com seu perfil.
          </p>
        </div>
        
        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto max-w-4xl">
          {franchiseData.map((franchise, index) => (
            <FranchiseCard
              key={index}
              logo={franchise.logo}
              title={franchise.title}
              category={franchise.category}
              percentage={franchise.percentage}
              investmentRange={franchise.investmentRange}
              returnRange={franchise.returnRange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default FranchiseCardsSection;
