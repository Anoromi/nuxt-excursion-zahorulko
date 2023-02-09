export function verifyEmail(email: string): null | string {
  if (email.trim().length === 0) return 'Email is empty'
  if (
    email.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ) === null
  )
    return 'Invalid email address'
  return null
}

export function verifyPassword(
  password: string,
): null | string {
  if (password.length < 8)
    return 'Password has to be longer than 8'
  return null
}
