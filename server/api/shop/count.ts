import { databaseNames } from '~~/server/utils/database/names'
import { firestore } from '~~/server/utils/firebase'
import {
  applySearchQuery,
  validateQueryData,
} from '~~/server/utils/pageQuery'

export default defineEventHandler(async (event) => {
  const queryData = validateQueryData(getQuery(event))

  return applySearchQuery(
    firestore.collection(databaseNames.excursions),
    queryData,
  )
    .count()
    .get()
    .then((snapshot) => snapshot.data().count)
})
