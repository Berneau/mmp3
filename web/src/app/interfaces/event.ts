export class Event {
  _id?: string
  name: string
  date: Date
  vendorId?: string
  description?: String
  location?: {
    name: String
    lat: Number
    long: Number
  }
}
