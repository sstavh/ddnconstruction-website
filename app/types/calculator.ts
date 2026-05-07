export type StepKey =
  | 'roomCount'
  | 'rooms'
  | 'services'
  | 'areas'
  | 'summary'
  | 'contact'

export interface CalculatorStep {
  id: number
  key: StepKey
  title: string
  subtitle: string
  description: string
  buttonText: string
  shortText: string
  completed: boolean
}

export interface ContactForm {
  name: string
  phone: string
  comment: string
}

export interface CalculatorData {
  roomCount: number
  selectedRooms: string[]
  servicesByRoom: Record<string, string[]>
  areasByRoom: Record<string, number | ''>
}

export interface RoomOption {
  value: string
  label: string
  serviceGroup: 'kitchen' | 'bathroom' | 'tiles' | 'spackling-painting' | 'electrical' | 'plumbing'
}

export type PriceType = 'fixed' | 'm2' | 'lft' | 'm2l'

export interface ServiceItem {
  id: string
  title: string
  price: number
  priceMax?: number
  priceType: PriceType
}

export type ServiceCatalog = Record<string, ServiceItem[]>
