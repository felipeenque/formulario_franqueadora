import { Input } from "@/components/ui/input";
import { CnpjMaskedInput } from "@/components/cnpj-masked-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Fingerprint, Tag, Boxes, Star } from 'lucide-react';

export function Step1CompanyData({ data, update }) {
  const handleChange = (e) => {
    update({ company: { ...data, [e.target.name]: e.target.value } });
  };

  const handleSelectChange = (name, value) => {
    update({ company: { ...data, [name]: value } });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-white">Dados da Empresa</h2>
      
      <div>
        <label htmlFor="nomeMarca" className="flex items-center text-sm font-medium mb-2">
          <Star className="h-4 w-4 mr-2 text-[#F9A51A]" />
          Nome da Marca <span className="text-red-500 ml-1">*</span>
        </label>
        <Input 
          id="nomeMarca" 
          name="nomeMarca" 
          value={data.nomeMarca} 
          onChange={handleChange} 
          placeholder="O nome comercial da sua franquia"
          required 
          className="bg-secondary/50 border-border h-12" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="razaoSocial" className="flex items-center text-sm font-medium mb-2">
            <Building className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Razão Social <span className="text-red-500 ml-1">*</span>
          </label>
          <Input 
            id="razaoSocial" 
            name="razaoSocial" 
            value={data.razaoSocial} 
            onChange={handleChange} 
            placeholder="Ex: Minha Empresa Ltda"
            required 
            className="bg-secondary/50 border-border h-12" 
          />
        </div>
        <div>
          <label htmlFor="cnpj" className="flex items-center text-sm font-medium mb-2">
            <Fingerprint className="h-4 w-4 mr-2 text-[#F9A51A]" />
            CNPJ <span className="text-red-500 ml-1">*</span>
          </label>
          <CnpjMaskedInput 
            id="cnpj" 
            name="cnpj" 
            value={data.cnpj} 
            onChange={handleChange} 
            placeholder="00.000.000/0000-00"
            required 
            readOnly
            className="bg-secondary/50 border-border h-12 cursor-not-allowed opacity-70" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="segmento" className="flex items-center text-sm font-medium mb-2">
            <Tag className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Segmento <span className="text-red-500 ml-1">*</span>
          </label>
          <Select name="segmento" onValueChange={(value) => handleSelectChange('segmento', value)} value={data.segmento} required>
            <SelectTrigger className="bg-secondary/50 border-border h-12">
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alimentacao">Alimentação</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
              <SelectItem value="varejo">Varejo</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="saude">Saúde e Beleza</SelectItem>
              <SelectItem value="casa-construcao">Casa e Construção</SelectItem>
              <SelectItem value="moda">Moda</SelectItem>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="subsegmento" className="flex items-center text-sm font-medium mb-2">
            <Boxes className="h-4 w-4 mr-2 text-[#F9A51A]" />
            Subsegmento <span className="text-red-500 ml-1">*</span>
          </label>
          <Select name="subsegmento" onValueChange={(value) => handleSelectChange('subsegmento', value)} value={data.subsegmento} required>
            <SelectTrigger className="bg-secondary/50 border-border h-12">
              <SelectValue placeholder="Selecione o subsegmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fast-food">Fast-food</SelectItem>
              <SelectItem value="limpeza">Limpeza</SelectItem>
              <SelectItem value="vestuario">Vestuário</SelectItem>
              <SelectItem value="consultoria">Consultoria</SelectItem>
              <SelectItem value="academia">Academia</SelectItem>
              <SelectItem value="pet-shop">Pet Shop</SelectItem>
              <SelectItem value="farmacia">Farmácia</SelectItem>
              <SelectItem value="informatica">Informática</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
