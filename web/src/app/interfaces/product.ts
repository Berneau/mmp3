export class Product {
  _id?: string
  name: string
  categoryId: string
  vendor: {}
  availableAt: {
    fromPeriod: string
    fromMonth: string
    toPeriod: string
    toMonth: string
  }
  imageUrl?: string
}
