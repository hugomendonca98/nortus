import { ExternalChatData, ChatData, Message } from '../types'
import { api } from '@/lib/services/api'

export async function fetchChat(): Promise<ChatData | undefined> {
  try {
    const response = await api('/chat.json', {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Falha ao buscar dados do chat')
    }

    const externalData: ExternalChatData = await response.json()

    // Converter dados externos para o formato interno
    const messages: Message[] = externalData.messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.timestamp,
      sender:
        msg.type === 'user_message'
          ? 'user'
          : msg.type === 'assistant_message'
            ? 'assistant'
            : 'ai-suggestion',
      senderName: msg.author,
    }))

    // Converter análise da conversa
    const aiAnalytics = externalData.conversationAnalysis.insights.insights.map(
      (insight) => ({
        title:
          insight.type === 'interaction'
            ? 'Interação detectada:'
            : insight.type === 'emotionAnalysis'
              ? 'Emoção predominante:'
              : 'Cluster identificado',
        description: insight.category,
      }),
    )

    const aiLocales = externalData.conversationAnalysis.futureSteps.actions.map(
      (action) => ({
        title:
          action.priority === 'hight'
            ? 'Ação imediata'
            : action.priority === 'medium'
              ? 'Sugestão a médio prazo'
              : 'Oportunidade futura',
        description: action.action,
      }),
    )

    const aiRecomendedActions = {
      title: 'Ações recomendadas',
      description:
        externalData.conversationAnalysis.futureSteps.actions[0]?.action ||
        'Contato de reforço em 3 dias',
      actions: externalData.conversationAnalysis.futureSteps.actions.map(
        (action) => ({
          title: action.action,
          value:
            action.priority === 'hight'
              ? 'Imediato'
              : action.priority === 'medium'
                ? 'Médio prazo'
                : 'Futuro',
        }),
      ),
    }

    return {
      messages,
      aiSuggestion: externalData.iaSugestion,
      aiAnalytics,
      aiLocales,
      aiRecomendedActions,
    }
  } catch (error) {
    console.error('Erro ao buscar dados do chat:', error)

    // Retornar dados padrão em caso de erro
    // return {
    //   messages: [
    //     {
    //       id: '1',
    //       content: 'Oi! Tudo certo? Gostaria de saber sobre o seguro automóvel',
    //       timestamp: '12:23',
    //       sender: 'user',
    //       senderName: 'Ricardo Leite - Seguro Automóvel',
    //     },
    //     {
    //       id: '2',
    //       content:
    //         'Oi, Ricardo! Tudo ótimo e com você? Claro que sim, posso te ajudar com o que precisar.',
    //       timestamp: '12:24',
    //       sender: 'assistant',
    //       senderName: 'Assistente',
    //     },
    //   ],
    //   aiSuggestion:
    //     'Interação detectada: Cliente interessado em seguro automóvel.',
    //   aiAnalytics: [
    //     {
    //       title: 'Interação detectada:',
    //       description: 'Educativa + Cross-sell',
    //     },
    //     {
    //       title: 'Emoção predominante:',
    //       description: 'Curiosidade + Interesse',
    //     },
    //   ],
    //   aiLocales: [
    //     {
    //       title: 'Ação imediata',
    //       description: 'Contato de reforço em 3 dias',
    //     },
    //     {
    //       title: 'Sugestão a médio prazo',
    //       description: 'Considerar pacote Saúde',
    //     },
    //   ],
    //   aiRecomendedActions: {
    //     title: 'Ações recomendadas',
    //     description: 'Contato de reforço em 3 dias',
    //     actions: [
    //       { title: 'Contato de reforço', value: '3 dias' },
    //       { title: 'Enviar proposta', value: 'Imediato' },
    //     ],
    //   },
    // }
  }
}
