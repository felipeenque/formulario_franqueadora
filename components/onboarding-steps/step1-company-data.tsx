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
              <SelectItem value="servicos_ou_negocios">Serviços e Outros Negócios</SelectItem>
              <SelectItem value="servicos_automotivos">Serviços Automotivos</SelectItem>
              <SelectItem value="alimentacao">Alimentação</SelectItem>
              <SelectItem value="casa_construcao">Casa e Construção</SelectItem>
              <SelectItem value="comunicacao_tecnologia">Comunicação, Informática e Eletrônicos</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="entretenimento_lazer">Entretenimento e Lazer</SelectItem>
              <SelectItem value="hotelaria_turismo">Hotelaria e Turismo</SelectItem>
              <SelectItem value="limpeza_conservacao">Limpeza e Conservação</SelectItem>
              <SelectItem value="moda">Moda</SelectItem>
              <SelectItem value="saude_beleza_bem_estar">Saúde, Beleza e Bem-Estar</SelectItem>
              <SelectItem value="estou_aberto_avaliar_todos">Estou aberto(a) a avaliar todos os segmentos</SelectItem>
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
              <SelectItem value="servicos_e_imobiliarias">Serviços e Imobiliárias</SelectItem>
              <SelectItem value="construcao_e_reforma">Construção e Reforma</SelectItem>
              <SelectItem value="moveis_e_decoracao">Móveis e Decoração</SelectItem>
              <SelectItem value="tecnologia_e_eletronicos">Tecnologia e Eletrônicos</SelectItem>
              <SelectItem value="comunicacao_e_midia">Comunicação e Mídia</SelectItem>
              <SelectItem value="servicos_graficos_e_impressao">Serviços Gráficos e Impressão</SelectItem>
              <SelectItem value="ensino_e_formacao_academica">Ensino e Formação Acadêmica</SelectItem>
              <SelectItem value="treinamento_profissional_e_capacitacao">Treinamento Profissional e Capacitação</SelectItem>
              <SelectItem value="idiomas">Idiomas</SelectItem>
              <SelectItem value="lazer_infantil_e_recreacao">Lazer Infantil e Recreação</SelectItem>
              <SelectItem value="servicos_de_entretenimento_e_experiencias">Serviços de Entretenimento e Experiências</SelectItem>
              <SelectItem value="agencias_de_turismo">Agencias de Turismo</SelectItem>
              <SelectItem value="hospedagem">Hospedagem</SelectItem>
              <SelectItem value="lavanderia">Lavanderia</SelectItem>
              <SelectItem value="reparos">Reparos</SelectItem>
              <SelectItem value="servicos_de_limpeza">Serviços de Limpeza</SelectItem>
              <SelectItem value="vestuarios">Vestuários</SelectItem>
              <SelectItem value="acessorios_pessoais">Acessórios Pessoais</SelectItem>
              <SelectItem value="calcados">Calçados</SelectItem>
              <SelectItem value="servicos_esteticos_e_bem_estar">Serviços Estéticos e Bem-Estar</SelectItem>
              <SelectItem value="servicos_medicos_e_clinicas">Serviços Médicos e Clínicas</SelectItem>
              <SelectItem value="odontologia">Odontologia</SelectItem>
              <SelectItem value="farmacias_e_manipulacao">Farmácias e Manipulação</SelectItem>
              <SelectItem value="cosmeticos_e_perfumarias">Cosméticos e Perfumarias</SelectItem>
              <SelectItem value="esportes_e_vida_ativa">Esportes e Vida Ativa</SelectItem>
              <SelectItem value="oticas">Óticas</SelectItem>
              <SelectItem value="academia">Academia</SelectItem>
              <SelectItem value="pecas_acessorios_e_manutencao">Peças, Acessórios e Manutenção</SelectItem>
              <SelectItem value="locacao_de_veiculos">Locação de veículos</SelectItem>
              <SelectItem value="consultorias_e_servicos_empresariais">Consultorias e Serviços Empresariais</SelectItem>
              <SelectItem value="logistica_e_operacoes">Logística e Operações</SelectItem>
              <SelectItem value="negocios_especializados">Negócios Especializados</SelectItem>
              <SelectItem value="bares_e_restaurantes">Bares e Restaurantes</SelectItem>
              <SelectItem value="docerias_padarias_e_cafes">Docerias, Padarias e Cafés</SelectItem>
              <SelectItem value="mercados_e_distribuicao">Mercados e Distribuição</SelectItem>
              <SelectItem value="saudaveis">Saudáveis</SelectItem>
              <SelectItem value="sorveterias_acaiterias_gelatterias">Sorveterias, Açaíterias, Gelatterias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
