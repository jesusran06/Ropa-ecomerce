import axios from '@axios'

export const API_URL_BACKEND = import.meta.env.VITE_API_BASE_URL

export const apiHttp = async (
  method,
  endpoint,
  data,
  options = {},

  // loading = true,
) => {
  const { token } = localStorage

  console.log('API_URL_BACKEND', API_URL_BACKEND)

  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token.replace(/['"]+/g, '')}` : '',
  }

  console.log('defaultHeaders', defaultHeaders)

  // if (!options.hasOwnProperty('headers'))

  options.headers = defaultHeaders
  console.log('data', data)
  console.log('options', options)
  let serviceResponse = {}

  method = method.toLowerCase()

  const servicePromise = axios({
    method,
    url: `${API_URL_BACKEND}${endpoint}`,
    data,
    ...options,
  })

  console.log('servicePromise', servicePromise)
  try {
    const [materializedPromise] = await Promise.all([servicePromise])

    console.log('materializedPromise', materializedPromise)
    serviceResponse = { ...materializedPromise.data }

    console.log('serviceResponse', serviceResponse)
  }
  catch (error) {
    console.log('error', error)
    serviceResponse = buildErrorMessage(error)
  }

  return serviceResponse
}

function buildErrorMessage(error) {
  console.log('error', error)
  console.error(error.response)

  return {
    ok: 0,
    message: {
      code: error.response.status,
      text: error.response.data.message,
    },
  }
}
