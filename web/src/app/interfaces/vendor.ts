export class Vendor {
  _id?: string
  name: string
  subName: string
  email: string
  imageUrl?: string
  description?: string
  tel?: number
  address: {
    city: string
    street?: string
    zip?: number
    lat?: number
    long?: number
  }
}
