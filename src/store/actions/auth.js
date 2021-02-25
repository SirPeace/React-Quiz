import Axios from "axios"
import { AUTH_LOGIN, AUTH_LOGOUT } from "./actionTypes"

const API_KEY = "api_key_here"

export function authorize(requestData, isLogin) {
  return async dispatch => {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

    if (!isLogin)
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

    try {
      const response = await Axios.post(url, requestData)

      if (response) {
        const expirationTime =
          Date.now() + Number(response.data.expiresIn) * 1000

        localStorage.setItem("idToken", response.data.idToken)
        localStorage.setItem("localId", response.data.localId)
        localStorage.setItem("expirationTime", expirationTime)

        dispatch(login(response.data.idToken))
        dispatch(autoLogout(expirationTime - Date.now()))
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export function login(token) {
  return {
    type: AUTH_LOGIN,
    token,
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time)
  }
}

export function autoLogin(token) {
  return dispatch => {
    const token = localStorage.getItem("idToken")
    if (!token) {
      dispatch(logout())
    } else {
      const expirationTime = localStorage.getItem("expirationTime")

      if (Date.now() > expirationTime) {
        dispatch(logout())
      } else {
        dispatch(login(localStorage.getItem("idToken")))
        dispatch(autoLogout(expirationTime - Date.now()))
      }
    }
  }
}

export function logout() {
  localStorage.removeItem("idToken")
  localStorage.removeItem("localId")
  localStorage.removeItem("expirationTime")

  return { type: AUTH_LOGOUT }
}
