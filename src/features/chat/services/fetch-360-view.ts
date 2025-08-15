import { External360ViewData, SidebarData } from '../types'
import { api } from '@/lib/services/api'

export async function fetch360View(): Promise<SidebarData> {
  try {
    const response = await api('/360-view.json', {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Falha ao buscar dados da visão 360')
    }

    const externalData: External360ViewData = await response.json()

    // Converter dados externos para o formato interno
    const products = externalData.produtos.map((produto, index) => ({
      id: (index + 1).toString(),
      name: produto.name,
      price: `R$ ${produto.value.toFixed(2).replace('.', ',')}/mês`,
      status: produto.status === 'Ativo' ? 'active' : 'inactive',
    }))

    const appActions = externalData.appActions.map((action, index) => ({
      id: (index + 1).toString(),
      action: action.action,
      timeAgo: action.accessed,
      details: action.pageTime
        ? `Tempo na página ${action.pageTime}`
        : undefined,
    }))

    const smartClassification = {
      segment: externalData.smartClassification.segment,
      lifeTimeValue: externalData.smartClassification.lifeTimeValue,
      churnProbability: externalData.smartClassification.churnProbability,
      expansionScore: {
        level: externalData.smartClassification.expansionScore.level,
        value: externalData.smartClassification.expansionScore.value,
      },
      retentionScore: {
        level: externalData.smartClassification.retetionScore.level,
        value: externalData.smartClassification.retetionScore.value,
      },
    }

    const aiSuggestions = {
      nbo: {
        offer: externalData.sugestionsIA.NBO.offer,
        value: externalData.sugestionsIA.NBO.value,
        conversionProbability:
          externalData.sugestionsIA.NBO.conversionProbability,
        reasonsWhy: externalData.sugestionsIA.NBO.reasonsWhy,
      },
      nba: {
        offer: externalData.sugestionsIA.NBA.offer,
        value: externalData.sugestionsIA.NBA.value,
        conversionProbability:
          externalData.sugestionsIA.NBA.conversionProbability,
        reasonsWhy: externalData.sugestionsIA.NBA.reasonsWhy,
      },
      nbx: {
        offer: externalData.sugestionsIA.NBX.offer,
        value: externalData.sugestionsIA.NBX.value,
        conversionProbability:
          externalData.sugestionsIA.NBX.conversionProbability,
        reasonsWhy: externalData.sugestionsIA.NBX.reasonsWhy,
      },
    }

    return {
      client: {
        name: externalData.client.name,
        type: externalData.client.clientType,
      },
      products: products.map((product) => ({
        ...product,
        status: product.status as 'active' | 'inactive',
      })),
      profileTags: externalData.profile,
      appActions,
      smartClassification,
      aiSuggestions,
    }
  } catch (error) {
    console.error('Erro ao buscar dados da visão 360:', error)

    // Retornar dados padrão em caso de erro
    return {
      client: {
        name: 'Ricardo Leite',
        type: 'Cliente Intermediário',
      },
      products: [
        {
          id: '1',
          name: 'Seguro automóvel',
          price: 'R$ 185,90/mês',
          status: 'active',
        },
        {
          id: '2',
          name: 'Seguro Residencial',
          price: 'R$ 89,90/mês',
          status: 'active',
        },
        {
          id: '3',
          name: 'Seguro Viagem',
          price: 'R$ 230,00/mês',
          status: 'inactive',
        },
      ],
      profileTags: ['Família com filhos', 'Profissional liberal', 'Investidor'],
      appActions: [
        {
          id: '1',
          action: 'Consultou página de planos de saúde',
          timeAgo: '45 min atrás',
          details: 'Tempo na página 3min e 42 seg',
        },
        {
          id: '2',
          action: 'Iniciou simulação de seguro auto',
          timeAgo: '1 dia atrás',
        },
      ],
      smartClassification: {
        segment: 'Premium',
        lifeTimeValue: 24580.0,
        churnProbability: 11,
        expansionScore: {
          level: 'Alto',
          value: 90,
        },
        retentionScore: {
          level: 'Médio',
          value: 60,
        },
      },
      aiSuggestions: {
        nbo: {
          offer: 'Seguro de vida individual com cobertura por doenças graves',
          value: 127.5,
          conversionProbability: 78,
          reasonsWhy: [
            'Cliente tem perfil compatível com produto',
            'Idade em faixa de preço competitivo',
            'Cliente já demonstrou preocupação com família',
          ],
        },
        nba: {
          offer: 'Plano odontológico familiar com cobertura nacional',
          value: 89.9,
          conversionProbability: 65,
          reasonsWhy: [
            'Cliente possui filhos e demonstrou interesse',
            'Não possui produto similar no portfólio',
            'Cobertura ampla e preço competitivo',
          ],
        },
        nbx: {
          offer: 'Seguro de equipamentos eletrônicos para viagens',
          value: 45.0,
          conversionProbability: 52,
          reasonsWhy: [
            'Cliente viaja com frequência',
            'Produto de baixo custo com alta utilidade',
            'Complementa pacote de proteção pessoal',
          ],
        },
      },
    }
  }
}
