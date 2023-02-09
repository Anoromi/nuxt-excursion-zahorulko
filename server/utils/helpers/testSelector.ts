type ParameterValues<T> = T[keyof T]

type InternalSelector<
  T,
  Previous extends string,
> = T extends Record<string, unknown>
  ?
      | ParameterValues<{
          [P in keyof T & string]: InternalSelector<
            T[P],
            `${Previous}.${P}`
          >
        }>
      | Previous
  : Previous

export type Selector<T> = T extends Record<string, unknown>
  ? ParameterValues<{
      [P in keyof T & string]: InternalSelector<
        T[P],
        `${P}`
      >
    }>
  : never

