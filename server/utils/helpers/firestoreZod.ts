import { Timestamp } from "firebase-admin/firestore"
import { z, ZodError, ZodIssueCode } from "zod"


export const timestampDate = () => z.preprocess((input) => {
    if (input instanceof Timestamp) return input.toDate()
    throw new ZodError([
      {
        message: '',
        code: ZodIssueCode.invalid_type,
        expected: 'object',
        received: typeof input,
        path: [],
      },
    ])
  }, z.date())