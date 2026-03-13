export interface StepField {
  key: string
  label: string
  type: 'select' | 'number' | 'radio'
  placeholder?: string
  options?: string[]
}

export interface CalculatorStep {
  id: number
  title: string
  subtitle: string
  description: string
  buttonText: string
  shortText: string
  completed: boolean
  fields: StepField[]
}

export interface ContactForm {
  name: string
  phone: string
  comment: string
}
