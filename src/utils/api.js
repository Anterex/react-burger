import { setCookie } from './cookie'
import { tokenUrl } from './config'

export function request (url, options) {
  return fetch(url, options)
    .then(checkResponse)
}

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
      new Error(`Ошибка API ${response.status}: ${response.statusText}`)
    )
}

export const refreshToken = () => {
  return request(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken() // обновляем токен
      if (!refreshData.success) {
        await Promise.reject(refreshData)
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options) // повторяем запрос
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
