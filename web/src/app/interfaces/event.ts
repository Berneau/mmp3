export class Event {
  _id?: string
  name: string
  date: Date
  description?: String
  location?: {
    name: String
    lat: Number
    long: Number
  }
}
