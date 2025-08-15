// Função para tentar corrigir JSON malformado
export function tryParseJSON(jsonString: string): any {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.warn('Erro ao fazer parse do JSON, tentando corrigir...', error)

    // Tentar corrigir problemas comuns de JSON
    let corrected = jsonString

    // Corrigir aspas simples por duplas
    corrected = corrected.replace(/'/g, '"')

    // Corrigir propriedades sem aspas (mais específico)
    corrected = corrected.replace(/(\w+):\s*([^,\s]+)/g, '"$1": $2')
    corrected = corrected.replace(/(\w+):\s*"([^"]*)"/g, '"$1": "$2"')
    corrected = corrected.replace(/(\w+):\s*\[/g, '"$1": [')
    corrected = corrected.replace(/(\w+):\s*\{/g, '"$1": {')

    // Corrigir vírgulas extras antes de fechamentos
    corrected = corrected.replace(/,(\s*[}\]])/g, '$1')
    corrected = corrected.replace(/,(\s*})/g, '$1')

    // Corrigir aspas não escapadas em strings
    corrected = corrected.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, '"$1$2$3"')

    // Corrigir quebras de linha e espaços extras
    corrected = corrected
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
    corrected = corrected.replace(/\s+/g, ' ').trim()

    // Tentar parse novamente
    try {
      return JSON.parse(corrected)
    } catch (secondError) {
      console.error('Falha ao corrigir JSON:', secondError)

      // Última tentativa: extrair dados usando regex
      try {
        return extractDataWithRegex(jsonString)
      } catch (regexError) {
        console.error('Falha ao extrair dados com regex:', regexError)
        throw new Error('JSON malformado e não foi possível corrigir')
      }
    }
  }
}

// Função de fallback para extrair dados usando regex
export function extractDataWithRegex(jsonString: string): any {
  const messages: any[] = []
  const insights: any[] = []
  const actions: any[] = []

  // Extrair mensagens
  const messageRegex =
    /"id":\s*"([^"]+)",\s*"author":\s*"([^"]+)",\s*"content":\s*"([^"]+)",\s*"timestamp":\s*"([^"]+)",\s*"type":\s*"([^"]+)"/g
  let match
  while ((match = messageRegex.exec(jsonString)) !== null) {
    messages.push({
      id: match[1],
      author: match[2],
      content: match[3],
      timestamp: match[4],
      type: match[5],
    })
  }

  // Extrair insights
  const insightRegex =
    /"id":\s*"([^"]+)",\s*"type":\s*"([^"]+)",\s*"category":\s*"([^"]+)"/g
  while ((match = insightRegex.exec(jsonString)) !== null) {
    insights.push({
      id: match[1],
      type: match[2],
      category: match[3],
    })
  }

  // Extrair ações
  const actionRegex =
    /"id":\s*"([^"]+)",\s*"action":\s*"([^"]+)",\s*"priority":\s*"([^"]+)"/g
  while ((match = actionRegex.exec(jsonString)) !== null) {
    actions.push({
      id: match[1],
      action: match[2],
      priority: match[3],
    })
  }

  // Extrair sugestão da IA
  const suggestionMatch = jsonString.match(/"iaSugestion":\s*"([^"]+)"/)
  const iaSuggestion = suggestionMatch
    ? suggestionMatch[1]
    : 'Sugestão não disponível'

  return {
    messages,
    iaSugestion: iaSuggestion,
    conversationAnalysis: {
      inights: {
        title: 'Análise da IA',
        insights,
      },
      futureSteps: {
        title: 'Próximos passos',
        actions,
      },
    },
  }
}
