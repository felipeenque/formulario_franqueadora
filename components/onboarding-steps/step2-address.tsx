import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Home, Globe, Instagram, Facebook, Linkedin, CheckCircle, Hash } from 'lucide-react';
import { CepMaskedInput } from "@/components/cep-masked-input";

export function Step2Address({ data, update }) {
  const [cepError, setCepError] = useState("");
  const [cepSuccess, setCepSuccess] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Auto-validate CEP when it reaches 8 digits
  useEffect(() => {
    const cep = data.cep?.replace(/\D/g, "");
    if (cep && cep.length === 8) {
      validateCep(cep);
    }
  }, [data.cep]);

  const validateCep = async (cep: string) => {
    if (cep.length !== 8) return;
    
    setIsLoadingCep(true);
    setCepError("");
    setCepSuccess(false);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("CEP não encontrado");
      
      const addressData = await response.json();
      if (addressData.erro) throw new Error("CEP inválido");
      
      update({
        address: {
          ...data,
          logradouro: addressData.logradouro,
          cidade: addressData.localidade,
          estado: addressData.uf,
        },
      });
      
      setCepSuccess(true);
      setTimeout(() => setCepSuccess(false), 3000);
    } catch (error) {
      setCepError(error.message);
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    update({ address: { ...data, cep: cepValue } });
  };

  const handleChange = (e) => {
    update({ address: { ...data, [e.target.name]: e.target.value } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-white">Endereço e Redes Sociais</h2>
      
      <div>
        <label htmlFor="cep" className="flex items-center text-sm font-medium mb-2">
          <MapPin className="h-4 w-4 mr-2 text-[#F9A51A]" />
          CEP <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <CepMaskedInput 
            id="cep" 
            name="cep" 
            value={data.cep} 
            onChange={handleCepChange} 
            placeholder="00000-000"
            required 
            className="bg-secondary/50 border-border h-12" 
          />
          {isLoadingCep && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#F9A51A]"></div>
            </div>
          )}
        </div>
        {cepError && <p className="text-sm text-red-500 mt-1">{cepError}</p>}
        {cepSuccess && (
          <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Endereço preenchido automaticamente
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <label htmlFor="logradouro" className="flex items-center text-sm font-medium mb-2">
            <Home className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Logradouro <span className="text-red-500 ml-1">*</span>
          </label>
          <Input 
            id="logradouro" 
            name="logradouro" 
            value={data.logradouro} 
            onChange={handleChange} 
            placeholder="Rua, Avenida, etc."
            required 
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
        <div>
          <label htmlFor="numero" className="flex items-center text-sm font-medium mb-2">
            <Hash className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Número <span className="text-red-500 ml-1">*</span>
          </label>
          <Input 
            id="numero" 
            name="numero" 
            value={data.numero} 
            onChange={handleChange} 
            placeholder="Ex: 123"
            required 
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="cidade" className="block text-sm font-medium mb-2">
            Cidade <span className="text-red-500">*</span>
          </label>
          <Input 
            id="cidade" 
            name="cidade" 
            value={data.cidade} 
            onChange={handleChange} 
            placeholder="São Paulo"
            required 
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
        <div>
          <label htmlFor="estado" className="block text-sm font-medium mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <Input 
            id="estado" 
            name="estado" 
            value={data.estado} 
            onChange={handleChange} 
            placeholder="SP"
            required 
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="site" className="flex items-center text-sm font-medium mb-2">
            <Globe className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Site
          </label>
          <Input 
            id="site" 
            name="site" 
            value={data.site} 
            onChange={handleChange} 
            placeholder="https://www.minhaempresa.com.br"
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
        <div>
          <label htmlFor="instagram" className="flex items-center text-sm font-medium mb-2">
            <Instagram className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Instagram
          </label>
          <Input 
            id="instagram" 
            name="instagram" 
            value={data.instagram} 
            onChange={handleChange} 
            placeholder="@minhaempresa"
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
        <div>
          <label htmlFor="facebook" className="flex items-center text-sm font-medium mb-2">
            <Facebook className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Facebook
          </label>
          <Input 
            id="facebook" 
            name="facebook" 
            value={data.facebook} 
            onChange={handleChange} 
            placeholder="facebook.com/minhaempresa"
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="flex items-center text-sm font-medium mb-2">
            <Linkedin className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Linkedin
          </label>
          <Input 
            id="linkedin" 
            name="linkedin" 
            value={data.linkedin} 
            onChange={handleChange} 
            placeholder="linkedin.com/company/minhaempresa"
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
      </div>
    </div>
  );
}
