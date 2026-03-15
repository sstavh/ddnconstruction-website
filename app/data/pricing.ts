export interface PriceItem {
  title: string
  titleUk: string
  price: string
}

export interface PriceCategory {
  id: string
  title: string
  titleUk: string
  description: string
  items: PriceItem[]
}

export const pricingData: PriceCategory[] = [
  {
    id: 'bathroom',
    title: 'Bathroom Remodeling',
    titleUk: 'Ремонт ванної кімнати',
    description: 'Bathroom renovation and installation services',
    items: [
      { title: 'Bathroom demolition', titleUk: 'Демонтаж ванної кімнати', price: '$8 / sq ft' },
      { title: 'Shower installation', titleUk: 'Встановлення душу', price: '$18 / sq ft' },
      { title: 'Bathtub installation', titleUk: 'Встановлення ванни', price: '$20 / sq ft' },
      { title: 'Walk-in shower installation', titleUk: 'Встановлення walk-in душу', price: '$22 / sq ft' },
      { title: 'Shower tile installation', titleUk: 'Укладання плитки в душі', price: '$15 / sq ft' },
      { title: 'Bathroom floor tile installation', titleUk: 'Укладання плитки на підлогу у ванній', price: '$12 / sq ft' },
      { title: 'Shower niche installation', titleUk: 'Монтаж ніші в душі', price: '$14 / sq ft' },
      { title: 'Shower bench installation', titleUk: 'Монтаж лавки в душі', price: '$16 / sq ft' },
      { title: 'Linear drain installation', titleUk: 'Встановлення лінійного трапу', price: '$13 / sq ft' },
      { title: 'Bathroom vanity installation', titleUk: 'Встановлення тумби з умивальником', price: '$11 / sq ft' },
      { title: 'Sink installation', titleUk: 'Встановлення умивальника', price: '$10 / sq ft' },
      { title: 'Toilet installation', titleUk: 'Встановлення туалету', price: '$9 / sq ft' },
      { title: 'Faucet installation', titleUk: 'Встановлення змішувачів', price: '$7 / sq ft' },
      { title: 'Glass shower door installation', titleUk: 'Встановлення скляних дверей душу', price: '$17 / sq ft' },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen Remodeling',
    titleUk: 'Ремонт кухні',
    description: 'Kitchen renovation and installation services',
    items: [
      { title: 'Kitchen demolition', titleUk: 'Демонтаж кухні', price: '$8 / sq ft' },
      { title: 'Kitchen cabinet installation', titleUk: 'Монтаж кухонних шаф', price: '$14 / sq ft' },
      { title: 'Kitchen countertop installation', titleUk: 'Монтаж кухонної стільниці', price: '$16 / sq ft' },
      { title: 'Kitchen backsplash tile installation', titleUk: 'Укладання плитки backsplash', price: '$13 / sq ft' },
      { title: 'Kitchen floor tile installation', titleUk: 'Укладання плитки на підлогу кухні', price: '$12 / sq ft' },
      { title: 'Kitchen sink installation', titleUk: 'Встановлення кухонної мийки', price: '$10 / sq ft' },
      { title: 'Kitchen faucet installation', titleUk: 'Встановлення кухонного змішувача', price: '$7 / sq ft' },
    ],
  },
  {
    id: 'interior',
    title: 'Interior Remodeling',
    titleUk: 'Внутрішні роботи',
    description: 'Interior finishing and renovation services',
    items: [
      { title: 'Tile floor installation', titleUk: 'Укладання плитки на підлогу', price: '$12 / sq ft' },
      { title: 'Laminate flooring installation', titleUk: 'Монтаж ламінату', price: '$9 / sq ft' },
      { title: 'Vinyl plank flooring installation', titleUk: 'Монтаж вінілової підлоги', price: '$10 / sq ft' },
      { title: 'Drywall installation', titleUk: 'Монтаж гіпсокартону', price: '$8 / sq ft' },
      { title: 'Drywall repair', titleUk: 'Ремонт гіпсокартону', price: '$7 / sq ft' },
      { title: 'Interior painting', titleUk: 'Фарбування приміщень', price: '$6 / sq ft' },
      { title: 'Trim and baseboard installation', titleUk: 'Монтаж плінтусів та лиштв', price: '$5 / sq ft' },
      { title: 'Interior door installation', titleUk: 'Встановлення міжкімнатних дверей', price: '$11 / sq ft' },
    ],
  },
  {
    id: 'exterior',
    title: 'Exterior Work',
    titleUk: 'Зовнішні роботи',
    description: 'Outdoor construction and exterior services',
    items: [
      { title: 'Deck installation', titleUk: 'Монтаж тераси (deck)', price: '$18 / sq ft' },
      { title: 'Deck repair', titleUk: 'Ремонт тераси', price: '$12 / sq ft' },
      { title: 'Fence installation', titleUk: 'Встановлення паркану', price: '$14 / sq ft' },
      { title: 'Exterior door installation', titleUk: 'Встановлення зовнішніх дверей', price: '$11 / sq ft' },
      { title: 'Exterior painting', titleUk: 'Фарбування будинку зовні', price: '$7 / sq ft' },
      { title: 'Power washing', titleUk: 'Мийка будинку pressure washer', price: '$4 / sq ft' },
    ],
  },
]
