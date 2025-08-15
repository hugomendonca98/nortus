export async function api(path: string, options: any = {}) {
  // Se o path já for uma URL completa, usar diretamente
  if (path.startsWith('http')) {
    const response = await fetch(path, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  const apiURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

  const response = await fetch(`${apiURL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  })

  return response
}
