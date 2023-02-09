import { productPromotions } from "~~/server/utils/pageQuery"


export default defineEventHandler(async () => {
  return productPromotions
})
