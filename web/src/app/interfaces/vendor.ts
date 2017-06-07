export class Vendor {
  _id?: string
  name: string
  userUid: string
  email: string
  description?: string
  imageUrl?: string
  imageKey?: string
  farmImageUrl?: string
  farmImageKey?: string
  subName?: string
  website?: string
  tel?: number
  address: {
    city?: string
    street?: string
    zip?: number
    lat?: number
    long?: number
  }
}
