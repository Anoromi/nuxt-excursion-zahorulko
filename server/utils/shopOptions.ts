import { DeepPick } from 'ts-essentials'
import { Selector } from './helpers/selector'

type EventImage = {
  id: string
  originalWidth: number
  originalHeight: number
}
export type ShopItemData = {
  title: string
  photo: EventImage
  type: string
  description: {
    short: string
    full: string
  }
  promotion: string[]
  price: {
    normal: number
    current?: number
  }
  location: {
    country: string
    region: string
  }
  popularity: number
  id: string
  gallery: EventImage[]
}

export type ShortShopItemData = DeepPick<
  ShopItemData,
  {
    id: true
    title: true
    photo: {
      id: true
    }
    description: {
      short: true
    }
    type: true
    promotion: true
    price: true
    location: true
    popularity: true
  }
>

export type ExtraShopItemData = DeepPick<
  ShopItemData,
  {
    description: {
      full: true
    },
    gallery: true
  }
>

export type ThumbnailShopItemData = DeepPick<
  ShopItemData,
  {
    title: true
    photo: {
      id: true
      originalWidth: true
      originalHeight: true
    }
  }
>

export type ShopItemSelector = Selector<ShopItemData>

export const shortShopItemSelector: ShopItemSelector[] = [
  'title',
  'photo.id',
  'type',
  'description.short',
  'promotion',
  'price',
  'location',
  'popularity',
  'id',
]

export const extraShopItemSelector: ShopItemSelector[] = [
  'description.full',
  'gallery',
]