<template>
  <div class="calculator-page">
    <PageHeader
      :step="currentStep + 1"
      :total-steps="steps.length"
      :can-go-back="currentStep > 0"
      :can-go-next="canGoNext"
      @back="goBack"
      @next="goNext"
    />

    <main class="calculator-layout">
      <CalculatorAside />

      <section class="calculator-panel">
        <StepProgress
          :steps="steps"
          :current-step="currentStep"
        />

        <CalculatorStepCard
          :step="steps[currentStep]"
          :is-last-step="currentStep === steps.length - 1"
          :form-data="calculatorForm"
          :room-options="roomOptions"
          :service-catalog="serviceCatalog"
          @complete-step="completeStep"
          @submit-form="submitForm"
        />

        <StepsInfo
          :steps="steps"
          :current-step="currentStep"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import PageHeader from '../components/ui/calculatorComponent/PageHeader.vue'
import CalculatorAside from '../components/ui/calculatorComponent/CalculatorAside.vue'
import StepProgress from '../components/ui/calculatorComponent/StepProgress.vue'
import CalculatorStepCard from '../components/ui/calculatorComponent/CalculatorStepCard.vue'
import StepsInfo from '../components/ui/calculatorComponent/StepsInfo.vue'
import type {
  CalculatorData,
  CalculatorStep,
  ContactForm,
  RoomOption,
  ServiceCatalog,
} from '../types/calculator'

const roomOptions: RoomOption[] = [
  { value: 'bathroom', label: 'Bathroom / Ванна кімната', serviceGroup: 'bathroom' },
  { value: 'kitchen', label: 'Kitchen / Кухня', serviceGroup: 'kitchen' },
  { value: 'bedroom', label: 'Bedroom / Спальня', serviceGroup: 'interior' },
  { value: 'living-room', label: 'Living Room / Вітальня', serviceGroup: 'interior' },
  { value: 'hallway', label: 'Hallway / Коридор', serviceGroup: 'interior' },
  { value: 'office', label: 'Office / Кабінет', serviceGroup: 'interior' },
  { value: 'exterior', label: 'Exterior / Зовнішні роботи', serviceGroup: 'exterior' },
]

const serviceCatalog: ServiceCatalog = {
  bathroom: [
    { id: 'bathroom-demolition', title: 'Bathroom demolition — Демонтаж ванної кімнати', price: 18, priceType: 'm2' },
    { id: 'shower-installation', title: 'Shower installation — Встановлення душу', price: 900, priceType: 'fixed' },
    { id: 'bathtub-installation', title: 'Bathtub installation — Встановлення ванни', price: 1100, priceType: 'fixed' },
    { id: 'walk-in-shower-installation', title: 'Walk-in shower installation — Встановлення walk-in душу', price: 1400, priceType: 'fixed' },
    { id: 'shower-tile-installation', title: 'Shower tile installation — Укладання плитки в душі', price: 45, priceType: 'm2' },
    { id: 'bathroom-floor-tile-installation', title: 'Bathroom floor tile installation — Укладання плитки на підлогу у ванній', price: 35, priceType: 'm2' },
    { id: 'shower-niche-installation', title: 'Shower niche installation — Монтаж ніші в душі', price: 250, priceType: 'fixed' },
    { id: 'shower-bench-installation', title: 'Shower bench installation — Монтаж лавки в душі', price: 350, priceType: 'fixed' },
    { id: 'linear-drain-installation', title: 'Linear drain installation — Встановлення лінійного трапу', price: 300, priceType: 'fixed' },
    { id: 'bathroom-vanity-installation', title: 'Bathroom vanity installation — Встановлення тумби з умивальником', price: 450, priceType: 'fixed' },
    { id: 'sink-installation', title: 'Sink installation — Встановлення умивальника', price: 220, priceType: 'fixed' },
    { id: 'toilet-installation', title: 'Toilet installation — Встановлення туалету', price: 250, priceType: 'fixed' },
    { id: 'faucet-installation', title: 'Faucet installation — Встановлення змішувачів', price: 120, priceType: 'fixed' },
    { id: 'glass-shower-door-installation', title: 'Glass shower door installation — Встановлення скляних дверей душу', price: 650, priceType: 'fixed' },
  ],
  kitchen: [
    { id: 'kitchen-demolition', title: 'Kitchen demolition — Демонтаж кухні', price: 16, priceType: 'm2' },
    { id: 'kitchen-cabinet-installation', title: 'Kitchen cabinet installation — Монтаж кухонних шаф', price: 1200, priceType: 'fixed' },
    { id: 'kitchen-countertop-installation', title: 'Kitchen countertop installation — Монтаж кухонної стільниці', price: 850, priceType: 'fixed' },
    { id: 'kitchen-backsplash-tile-installation', title: 'Kitchen backsplash tile installation — Укладання плитки backsplash', price: 40, priceType: 'm2' },
    { id: 'kitchen-floor-tile-installation', title: 'Kitchen floor tile installation — Укладання плитки на підлогу кухні', price: 35, priceType: 'm2' },
    { id: 'kitchen-sink-installation', title: 'Kitchen sink installation — Встановлення кухонної мийки', price: 240, priceType: 'fixed' },
    { id: 'kitchen-faucet-installation', title: 'Kitchen faucet installation — Встановлення кухонного змішувача', price: 120, priceType: 'fixed' },
  ],
  interior: [
    { id: 'tile-floor-installation', title: 'Tile floor installation — Укладання плитки на підлогу', price: 32, priceType: 'm2' },
    { id: 'laminate-flooring-installation', title: 'Laminate flooring installation — Монтаж ламінату', price: 18, priceType: 'm2' },
    { id: 'vinyl-plank-flooring-installation', title: 'Vinyl plank flooring installation — Монтаж вінілової підлоги', price: 20, priceType: 'm2' },
    { id: 'drywall-installation', title: 'Drywall installation — Монтаж гіпсокартону', price: 28, priceType: 'm2' },
    { id: 'drywall-repair', title: 'Drywall repair — Ремонт гіпсокартону', price: 16, priceType: 'm2' },
    { id: 'interior-painting', title: 'Interior painting — Фарбування приміщень', price: 14, priceType: 'm2' },
    { id: 'trim-baseboard-installation', title: 'Trim and baseboard installation — Монтаж плінтусів та лиштв', price: 8, priceType: 'm2' },
    { id: 'interior-door-installation', title: 'Interior door installation — Встановлення міжкімнатних дверей', price: 350, priceType: 'fixed' },
  ],
  exterior: [
    { id: 'deck-installation', title: 'Deck installation — Монтаж тераси (deck)', price: 65, priceType: 'm2' },
    { id: 'deck-repair', title: 'Deck repair — Ремонт тераси', price: 35, priceType: 'm2' },
    { id: 'fence-installation', title: 'Fence installation — Встановлення паркану', price: 55, priceType: 'm2' },
    { id: 'exterior-door-installation', title: 'Exterior door installation — Встановлення зовнішніх дверей', price: 500, priceType: 'fixed' },
    { id: 'exterior-painting', title: 'Exterior painting — Фарбування будинку зовні', price: 18, priceType: 'm2' },
    { id: 'power-washing', title: 'Power washing — Мийка будинку pressure washer', price: 10, priceType: 'm2' },
  ],
}

const steps = reactive<CalculatorStep[]>([
  {
    id: 1,
    key: 'roomCount',
    title: 'Скільки кімнат?',
    subtitle: 'Перший крок',
    description: 'Оберіть загальну кількість кімнат або зон, для яких потрібен розрахунок.',
    buttonText: 'Підтвердити кількість кімнат',
    shortText: 'Вкажіть кількість кімнат.',
    completed: false,
  },
  {
    id: 2,
    key: 'rooms',
    title: 'Оберіть кімнати',
    subtitle: 'Список приміщень',
    description: 'Оберіть кімнати. Кількість вибраних кімнат не може бути більшою, ніж ви вказали на попередньому кроці.',
    buttonText: 'Підтвердити кімнати',
    shortText: 'Оберіть кімнати для робіт.',
    completed: false,
  },
  {
    id: 3,
    key: 'services',
    title: 'Оберіть види робіт',
    subtitle: 'Роботи по кожній кімнаті',
    description: 'Для кожної кімнати оберіть одну або кілька послуг.',
    buttonText: 'Підтвердити роботи',
    shortText: 'Оберіть послуги по кімнатах.',
    completed: false,
  },
  {
    id: 4,
    key: 'areas',
    title: 'Вкажіть площу',
    subtitle: 'Квадратні метри',
    description: 'Введіть площу для кожної вибраної кімнати.',
    buttonText: 'Підтвердити площу',
    shortText: 'Додайте площу по кімнатах.',
    completed: false,
  },
  {
    id: 5,
    key: 'summary',
    title: 'Ваш чек',
    subtitle: 'Підсумок заявки',
    description: 'Перевірте всі вибрані дані перед відправкою.',
    buttonText: 'Зв’язатися з нами',
    shortText: 'Перевірте чек.',
    completed: false,
  },
  {
    id: 6,
    key: 'contact',
    title: 'Контактні дані',
    subtitle: 'Надіслати заявку',
    description: 'Заповніть форму, а ми отримаємо всі дані з вашого чеку.',
    buttonText: 'Надіслати форму',
    shortText: 'Залиште контакти.',
    completed: false,
  },
])

const currentStep = ref(0)

const calculatorForm = reactive<CalculatorData>({
  roomCount: 1,
  selectedRooms: [],
  servicesByRoom: {},
  areasByRoom: {},
})

const contactForm = reactive<ContactForm>({
  name: '',
  phone: '',
  comment: '',
})

const canGoNext = computed(() => {
  if (currentStep.value >= steps.length - 1) return false
  return steps[currentStep.value].completed
})

function goBack() {
  if (currentStep.value > 0) currentStep.value -= 1
}

function goNext() {
  if (canGoNext.value) currentStep.value += 1
}

function completeStep(payload?: Partial<CalculatorData>) {
  if (payload) {
    if (typeof payload.roomCount === 'number') {
      calculatorForm.roomCount = payload.roomCount
    }

    if (payload.selectedRooms) {
      calculatorForm.selectedRooms = [...payload.selectedRooms]
    }

    if (payload.servicesByRoom) {
      calculatorForm.servicesByRoom = { ...payload.servicesByRoom }
    }

    if (payload.areasByRoom) {
      calculatorForm.areasByRoom = { ...payload.areasByRoom }
    }
  }

  steps[currentStep.value].completed = true

  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1
  }
}

function submitForm(payload: ContactForm) {
  Object.assign(contactForm, payload)
  steps[currentStep.value].completed = true

  const requestPayload = {
    calculator: {
      roomCount: calculatorForm.roomCount,
      selectedRooms: calculatorForm.selectedRooms,
      servicesByRoom: calculatorForm.servicesByRoom,
      areasByRoom: calculatorForm.areasByRoom,
    },
    contacts: {
      ...contactForm,
    },
  }

  console.log('Calculator submit:', requestPayload)
}
</script>

<style>

.calculator-page {
  min-height: 100vh;
  padding: 24px;
}

.calculator-layout {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 560px;
  gap: 24px;
  align-items: stretch;
}

.calculator-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

@media (max-width: 1100px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .calculator-page {
    padding: 16px;
  }
}
</style>
