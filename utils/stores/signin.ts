export function useLoginCredentials() {
  return useState('login-credentials', () => {
    return {
      email: '',
      password: '',
    }
  })
}
