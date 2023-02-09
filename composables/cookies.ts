export const getRequestCookies = () =>
  useRequestHeaders(['cookie']).cookie ?? ''
