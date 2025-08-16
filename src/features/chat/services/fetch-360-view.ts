import { External360ViewData, SidebarData } from '../types'
import { api } from '@/lib/services/api'

export async function fetch360View(): Promise<SidebarData | undefined> {
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
    throw error
  }
}
