import { z } from 'zod'

export const oneOrMany = <
  V extends z.ZodTypeAny,
>(
  validator: V,
) => {
  type T = V extends z.ZodType<infer Output, any, any> ? Output : unknown
  return validator
    .transform<T[]>((v) => [v])
    .or(validator.array())
}