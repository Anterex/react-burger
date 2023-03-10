import { setCookie } from './cookie'
import { tokenUrl } from './config'
import { IUser } from '../Abstraction/IUser'
import { ICustomRequestInit } from './ICustomRequestInit'

export async function request <T> (url: string, options?: RequestInit): Promise<T> {
  return await fetch(url, options).then(async res => await checkResponse<T>(res))
}

export const checkResponse = async <T>(res: Response): Promise<T> => {
  return res.ok ? await res.json() : await res.json().then(async (err) => await Promise.reject(err))
}

interface IToken {
  success: boolean
  user: IUser
  accessToken: string
  refreshToken: string
}

export const refreshToken = async (): Promise<IToken> => {
  return await request(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
}

export const fetchWithRefresh = async (url: string, options: ICustomRequestInit): Promise<ICustomResponse> => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken() // обновляем токен
      if (!refreshData.success) {
        await Promise.reject(refreshData)
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken, null)
      // @ts-expect-error
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options) // повторяем запрос
      return await checkResponse(res)
    } else {
      return await Promise.reject(err)
    }
  }
}
