import { faker } from '@faker-js/faker'
import { databaseNames } from '../database/names'
import { firestore } from '../firebase'
import { random, randomRange } from '../helpers/random'
import { range } from '../helpers/range'
import {
  productPromotions,
  productTypes,
} from '../pageQuery'
import {
  ShopItemData,
} from '../shopOptions'

const size = 50

export async function createShopItems() {

  for (let i = 0; i < size; i++) {

    const itemData: Omit<ShopItemData, 'id'> = {
      description: {
        short: faker.lorem.words(10),
        full: faker.lorem.words(100),
      },
      title: faker.company.name(),
      location: {
        country: faker.address.country(),
        region: faker.address.county(),
      },
      photo: {
        id: random(1e15).toString(),
        originalWidth: randomRange(500, 900),
        originalHeight: randomRange(375, 700),
      },
      price: { normal: parseFloat(faker.commerce.price()) },
      type: productTypes[random(productTypes.length)],
      promotion: [
        productPromotions[random(productPromotions.length)],
      ],
      popularity: randomRange(0, 100),
      gallery: Array.from(range(0, 10)).map(() => ({
        id: random(1e15).toString(),
        originalWidth: randomRange(400, 700),
        originalHeight: randomRange(300, 500),
      })),
    }

    await firestore
      .collection(databaseNames.excursions)
      .add(
        itemData,
      )
  }
}
