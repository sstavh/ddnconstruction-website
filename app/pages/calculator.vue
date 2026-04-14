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

        <div v-if="loadingCatalog" class="calculator-status">
          Завантаження прайсу...
        </div>
        <div v-else-if="catalogError" class="calculator-status calculator-status--error">
          Помилка завантаження прайсу: {{ catalogError }}
        </div>

        <CalculatorStepCard
          :step="currentStepData"
          :is-last-step="currentStep === steps.length - 1"
          :form-data="calculatorForm"
          :room-options="roomOptions"
          :service-catalog="serviceCatalog"
          @complete-step="completeStep"
          @submit-form="submitForm"
        />

        <div v-if="submitStatus" class="calculator-status calculator-status--submit">
          {{ submitStatus }}
        </div>

        <StepsInfo
          :steps="steps"
          :current-step="currentStep"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import PageHeader from '../components/ui/calculatorComponent/PageHeader.vue'
import CalculatorAside from '../components/ui/calculatorComponent/CalculatorAside.vue'
import StepProgress from '../components/ui/calculatorComponent/StepProgress.vue'
import CalculatorStepCard from '../components/ui/calculatorComponent/CalculatorStepCard.vue'
import StepsInfo from '../components/ui/calculatorComponent/StepsInfo.vue'
import type {
  CalculatorData,
  CalculatorStep,
  ContactForm,
  PriceType,
  RoomOption,
  ServiceCatalog,
  ServiceItem,
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

const serviceCatalog = ref<ServiceCatalog>({})
const catalogError = ref('')
const loadingCatalog = ref(true)
const submitStatus = ref('')

const apiUrl = useRuntimeConfig().public.apiUrl

function parsePrice(value: string) {
  const normalized = String(value).trim().replace(/[^0-9.]/g, '')
  return normalized === '' ? 0 : Number(normalized)
}

function mapPricingToCatalog(data: Array<{ id: string; title: string; description: string; items: Array<{ id: number; title: string; titleUk: string; price: string; priceType?: string; categoryId: string }> }>) {
  return data.reduce((acc, category) => {
    acc[category.id] = category.items.map((item) => ({
      id: String(item.id),
      title: `${item.title} — ${item.titleUk}`,
      price: parsePrice(item.price),
      priceType: (item.priceType === 'm2' ? 'm2' : 'fixed') as PriceType,
    }))
    return acc
  }, {} as ServiceCatalog)
}

async function loadServiceCatalog() {
  loadingCatalog.value = true
  catalogError.value = ''

  try {
    const response = await fetch(`${apiUrl}/pricing`)
    if (!response.ok) {
      throw new Error(`Failed to load pricing catalog: ${response.status}`)
    }
    const pricingData = await response.json()
    serviceCatalog.value = mapPricingToCatalog(pricingData)
  } catch (error) {
    catalogError.value = error instanceof Error ? error.message : String(error)
  } finally {
    loadingCatalog.value = false
  }
}

onMounted(loadServiceCatalog)

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
const currentStepData = computed<CalculatorStep>(() => {
  const step = steps[currentStep.value]
  if (step) return step
  return steps[0]!
})

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
  return currentStepData.value.completed
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

  currentStepData.value.completed = true

  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1
  }
}

function submitForm(payload: ContactForm) {
  Object.assign(contactForm, payload)
  currentStepData.value.completed = true

  const requestPayload = {
    name: contactForm.name,
    phone: contactForm.phone,
    comment: contactForm.comment,
    roomCount: calculatorForm.roomCount,
    selectedRooms: calculatorForm.selectedRooms,
    servicesByRoom: calculatorForm.servicesByRoom,
    areasByRoom: calculatorForm.areasByRoom,
  }

  submitStatus.value = ''

  fetch(`${apiUrl}/calculator-leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestPayload),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Помилка при відправці заявки: ${response.status}`)
      }
      submitStatus.value = 'Заявка успішно відправлена!'
      return response.json()
    })
    .then((data) => {
      console.log('Calculator submit:', data)
    })
    .catch((error) => {
      submitStatus.value = error instanceof Error ? error.message : String(error)
      console.error(error)
    })
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

.calculator-status {
  padding: 14px 18px;
  border-radius: 16px;
  background: rgba(59, 130, 246, 0.1);
  color: #dbeafe;
  border: 1px solid rgba(59, 130, 246, 0.2);
  margin-top: 16px;
}

.calculator-status--error {
  background: rgba(248, 113, 113, 0.12);
  color: #fee2e2;
  border-color: rgba(248, 113, 113, 0.3);
}

.calculator-status--submit {
  background: rgba(34, 197, 94, 0.12);
  color: #dcfce7;
  border-color: rgba(34, 197, 94, 0.3);
}

@media (max-width: 720px) {
  .calculator-page {
    padding: 16px;
  }
}
</style>
