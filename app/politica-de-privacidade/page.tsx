import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso da Plataforma | Franchise Store",
  description: "Termos de Uso da Plataforma Franchise Store para disponibilização de matchs - oportunidades de potenciais interessados na aquisição de franquias.",
}

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-orange-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/30 backdrop-blur-sm rounded-lg border border-border p-8 text-white">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">TERMOS DE USO DA PLATAFORMA FRANCHISE STORE</h1>
              <h2 className="text-3xl font-bold text-[#F9A51A] mb-6">DISPONIBILIZAÇÃO DE MATCHS</h2>
            </header>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">1. ACEITE DOS TERMOS</h2>
                
                <p className="text-gray-200 leading-relaxed">
                  Ao acessar e utilizar a plataforma Franchise Store para adquirir matchs (oportunidades de potenciais 
                  interessados na aquisição de franquias), o usuário cadastrado como FRANQUEADORA declara ter lido, 
                  compreendido e aceitado integralmente estes Termos de Uso, que regem a relação comercial entre as partes.
                </p>
                
                <p className="text-gray-200 leading-relaxed">
                  A aceitação se dá de forma eletrônica, mediante clique no botão "Li e Aceito", sendo dispensada a 
                  assinatura física ou digital.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">2. OBJETO</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <strong>2.1</strong> Estes Termos regulam o licenciamento de uso da plataforma para disponibilização 
                    de oportunidades de potenciais interessados em aquisição de franquias ("matchs"), qualificados por 
                    meio de processo automatizado de compatibilidade.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>2.2</strong> A FRANQUEADORA poderá adquirir, por meio da plataforma digital, os matchs que 
                    forem compatíveis com os parâmetros previamente definidos por ela no sistema, reconhecendo que a 
                    aquisição do match não constitui garantia de venda.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>2.3</strong> A aquisição dos matchs consiste na cessão de acesso a dados de potenciais 
                    interessados, sendo dever exclusivo da FRANQUEADORA conduzir o processo comercial, sem garantia 
                    de resposta, engajamento ou fechamento.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">3. PAGAMENTO E USO DE CRÉDITOS</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <strong>3.1</strong> A FRANQUEADORA deverá inserir saldo pré-pago na plataforma para habilitar o 
                    uso e a aquisição de matchs.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>3.2</strong> Os valores depositados serão convertidos em créditos na carteira virtual da 
                    FRANQUEADORA dentro da plataforma. Caso não haja saldo, não será possível adquirir matchs.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>3.3</strong> O valor de cada match poderá variar conforme critérios internos da plataforma. 
                    A aquisição será debitada automaticamente no momento da compra.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>3.4</strong> O saldo é pessoal, intransferível e não reembolsável, devendo ser utilizado 
                    integralmente pela FRANQUEADORA.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>3.5</strong> Caso a conta permaneça sem saldo por mais de 30 (trinta) dias, a licença de 
                    uso poderá ser cancelada.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">4. LICENÇA DE USO</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <strong>4.1</strong> Com créditos ativos, a FRANQUEADORA poderá:
                  </p>
                  
                  <ul className="list-disc ml-6 space-y-2 text-gray-200">
                    <li>a) Estabelecer filtros e critérios para exibição de matchs;</li>
                    <li>b) Reservar e adquirir matchs que atendam aos filtros definidos;</li>
                    <li>c) Entrar em contato com os matchs adquiridos para apresentação de propostas.</li>
                  </ul>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>4.2</strong> Os dados disponibilizados referentes aos matchs são obtidos com consentimento 
                    e estão em conformidade com a LGPD.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>4.3</strong> É vedada a cessão, gratuita ou onerosa, dos dados dos matchs obtidos na plataforma.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>4.4</strong> O uso inadequado da plataforma ou tentativa de violação de segurança poderá 
                    gerar multa de até R$ 100.000,00, além de perdas e danos e bloqueio imediato da conta.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">5. RISCOS E LIMITAÇÕES</h2>
                
                <p className="text-gray-200 leading-relaxed">
                  <strong>5.1</strong> A plataforma não garante resposta, engajamento, conversão ou fechamento de 
                  negócio. O serviço consiste exclusivamente na disponibilização de dados de potenciais interessados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">6. USO DAS INFORMAÇÕES E PROTEÇÃO DE DADOS</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <strong>6.1</strong> A FRANQUEADORA se compromete a utilizar os dados dos matchs exclusivamente 
                    para fins comerciais legítimos relacionados à oferta de franquias.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>6.2</strong> É proibido repassar, comercializar ou compartilhar os dados dos matchs com 
                    terceiros, salvo autorização expressa do titular ou exigência legal.
                  </p>

                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed mb-3">
                      <strong>6.2.1</strong> O descumprimento desta cláusula acarretará multa não compensatória de 
                      R$ 10.000,00 por match indevidamente compartilhado, corrigida pelo IPCA, sem prejuízo de 
                      indenizações adicionais.
                    </p>
                    
                    <p className="text-gray-200 leading-relaxed">
                      <strong>6.2.2</strong> A FRANQUEADORA assume total responsabilidade por reclamações, processos 
                      ou penalidades administrativas decorrentes de uso indevido ou vazamento de dados após a 
                      aquisição do match.
                    </p>
                  </div>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>6.3</strong> A prestação dos serviços ocorre em caráter não exclusivo, podendo a plataforma 
                    manter contratos semelhantes com outras marcas.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">7. OBRIGAÇÕES DAS PARTES</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Da FRANCHISE STORE:</h3>
                  <ul className="list-disc ml-6 space-y-2 text-gray-200">
                    <li>a) Disponibilizar acesso à plataforma e ao sistema de compatibilidade;</li>
                    <li>b) Validar previamente os dados de contato dos matchs;</li>
                    <li>c) Zelar pela segurança das informações.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Da FRANQUEADORA:</h3>
                  <ul className="list-disc ml-6 space-y-2 text-gray-200">
                    <li>a) Manter atualizados os filtros e parâmetros de busca;</li>
                    <li>b) Utilizar os dados dos matchs de forma ética e em conformidade com a LGPD;</li>
                    <li>c) Responder por qualquer uso indevido dos dados adquiridos.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">8. PRAZO E ENCERRAMENTO</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <strong>8.1</strong> Estes Termos vigoram por prazo indeterminado a partir da aceitação eletrônica.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>8.2</strong> A FRANQUEADORA pode encerrar seu acesso mediante solicitação por escrito com 
                    antecedência mínima de 10 (dez) dias úteis.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>8.3</strong> Em caso de encerramento, eventual saldo remanescente ficará disponível por 
                    até 30 (trinta) dias, salvo acordo diverso.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-[#F9A51A] mb-4">9. DISPOSIÇÕES FINAIS</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <strong>9.1</strong> A FRANCHISE STORE pode ceder a execução parcial destes serviços a empresas do 
                    mesmo grupo, sem necessidade de aviso prévio, desde que mantida a qualidade da entrega.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>9.2</strong> É vedado o aliciamento de colaboradores, parceiros ou investidores da FRANCHISE 
                    STORE por até 2 (dois) anos após o encerramento da relação, sob pena de multa conforme artigo 608 
                    do Código Civil.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>9.3</strong> Este documento é regido pela legislação brasileira.
                  </p>

                  <p className="text-gray-200 leading-relaxed">
                    <strong>9.4</strong> <strong>Foro:</strong> fica eleito o foro da comarca onde está situada a sede 
                    da FRANCHISE STORE, renunciando a qualquer outro, por mais privilegiado que seja.
                  </p>
                </div>
              </section>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mt-12">
                <p className="text-gray-200 leading-relaxed text-center font-semibold">
                  Ao clicar no botão "Li e Aceito", a FRANQUEADORA confirma ter lido, compreendido e concordado 
                  integralmente com estes Termos de Uso.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F9A51A] to-[#F9821A] text-stone-950 font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Voltar para o início
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
