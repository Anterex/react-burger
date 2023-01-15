import { BackEndUrl } from './config'

export const getIngredients = async () => {
  return await fetch(`${BackEndUrl}/ingredients`)
    .then((res) => {
      return res.ok
        ? res.json()
        : res.json().then(err => Promise.reject(err))
    })
}
export const postOrder = () => {
  return { id: 37486154 }
}
