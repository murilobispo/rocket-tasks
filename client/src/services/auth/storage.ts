const TOKEN_KEY = 'token'
const SESSION_EXPIRED_KEY = 'session-expired'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isSessionExpired(): boolean {
  return sessionStorage.getItem(SESSION_EXPIRED_KEY) === 'true'
}

export function setSessionExpired() {
  sessionStorage.setItem(SESSION_EXPIRED_KEY, 'true')
}

export function removeSessionExpired() {
  sessionStorage.removeItem(SESSION_EXPIRED_KEY)
} 