import { getBearer } from './cookie'

export const optionsGet = () => {
  return {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
}

export const optionsGetSecured = () => {
  return {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getBearer()
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
}

export const optionsPost = body => {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(body)
  }
}

export const optionsPatchSecured = body => {
  return {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getBearer()
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(body)
  }
}
