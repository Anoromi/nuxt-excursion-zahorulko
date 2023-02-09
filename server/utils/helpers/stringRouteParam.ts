import { H3Event } from 'h3'
import { createBadData } from '../badData'
import { areStrings } from '../isType'

export function ensureStringRouteParam(
  event: H3Event,
  routeParam: string,
) {
  const paramValue = getRouterParam(event, routeParam)
  if (!areStrings(routeParam)) throw createBadData()
  return paramValue as string
}
