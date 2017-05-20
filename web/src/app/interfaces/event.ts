export class Event {
  _id?: string
  name: string
  date: Date
  description?: string
  location?: {
    name: string
    lat: number
    long: number
  }
}
