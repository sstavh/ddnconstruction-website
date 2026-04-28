<template>
  <section class="step-card">
    <p class="step-card__label">Етап {{ step.id }}</p>
    <h2 class="step-card__title">{{ step.title }}</h2>
    <p class="step-card__subtitle">{{ step.subtitle }}</p>
    <p class="step-card__description">{{ step.description }}</p>

    <div v-if="step.key === 'roomCount'" class="count-grid">
      <button
        v-for="count in roomCountOptions"
        :key="count"
        type="button"
        class="select-card"
        :class="{ 'select-card--active': draft.roomCount === count }"
        @click="draft.roomCount = count"
      >
        {{ count }}
      </button>
    </div>

    <div v-else-if="step.key === 'rooms'" class="rooms-box">
      <div class="helper-box">
        You can choose no more than <strong>{{ formData.roomCount }}</strong> room(s).
      </div>

      <div class="rooms-grid">
        <button
          v-for="room in roomOptions"
          :key="room.value"
          type="button"
          class="select-card"
          :class="{ 'select-card--active': draft.selectedRooms.includes(room.value) }"
          @click="toggleRoom(room.value)"
        >
          {{ room.label }}
        </button>
      </div>
    </div>

    <div v-else-if="step.key === 'services'" class="services-box">
      <div
        v-for="room in draft.selectedRooms"
        :key="room"
        class="service-room-card"
      >
        <h3 class="service-room-card__title">{{ getRoomLabel(room) }}</h3>

        <div class="chips-grid">
          <button
            v-for="service in getServicesForRoom(room)"
            :key="service.id"
            type="button"
            class="chip-button"
            :class="{ 'chip-button--active': isServiceSelected(room, service.id) }"
            @click="toggleService(room, service.id)"
          >
            <span class="chip-button__title">{{ service.title }}</span>
            <span class="chip-button__price">
              {{ formatPriceLabel(service) }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="step.key === 'areas'" class="areas-box">
      <div
        v-for="room in draft.selectedRooms"
        :key="room"
        class="field-group"
      >
        <label class="field-group__label">
          {{ getRoomLabel(room) }} — area, m²
        </label>

        <input
          class="field-group__control"
          type="number"
          min="1"
          placeholder="Наприклад 12"
          :value="draft.areasByRoom[room] || ''"
          @input="updateArea(room, ($event.target as HTMLInputElement).value)"
        >
      </div>
    </div>

    <div v-else-if="step.key === 'summary'" class="summary-box">
      <div class="receipt-card">
        <div class="receipt-card__row">
          <span>Number of Rooms</span>
          <strong>{{ formData.roomCount }}</strong>
        </div>

        <div
          v-for="room in formData.selectedRooms"
          :key="room"
          class="receipt-room"
        >
          <div class="receipt-room__head">
            <h3>{{ getRoomLabel(room) }}</h3>
            <span>{{ formData.areasByRoom[room] || 0 }} m²</span>
          </div>

          <div
            v-for="serviceId in formData.servicesByRoom[room] || []"
            :key="serviceId"
            class="receipt-line"
          >
            <div class="receipt-line__info">
              <strong>{{ getServiceById(room, serviceId)?.title }}</strong>
              <small>{{ getServiceCalculationText(room, serviceId) }}</small>
              <span v-if="getDiscountPercent(serviceId) > 0" class="receipt-discount-badge">
                −{{ getDiscountPercent(serviceId) }}%
              </span>
            </div>

            <div class="receipt-line__price">
              <span
                v-if="getDiscountPercent(serviceId) > 0"
                class="receipt-line__price-original"
              >{{ formatCurrency(getServiceTotal(room, serviceId)) }}</span>
              {{ formatCurrency(getServiceTotalDiscounted(room, serviceId)) }}
            </div>
          </div>

          <div class="receipt-room__subtotal">
            <span>Subtotal for Room</span>
            <strong>{{ formatCurrency(getRoomTotal(room)) }}</strong>
          </div>
        </div>

        <div v-if="discountActive && grandTotal !== grandTotalNoDiscount" class="receipt-savings">
          <span>Ваша знижка</span>
          <strong>−{{ formatCurrency(grandTotalNoDiscount - grandTotal) }}</strong>
        </div>

        <div class="receipt-total">
          <span>Grand Total</span>
          <strong>{{ formatCurrency(grandTotal) }}</strong>
        </div>
      </div>
    </div>

    <ContactForm
      v-else-if="step.key === 'contact'"
      @submit-form="handleSubmitForm"
    />

    <button
      v-if="step.key !== 'contact'"
      class="step-card__button"
      :disabled="!isStepValid"
      @click="handleComplete"
    >
      {{ step.buttonText }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import ContactForm from './ContactForm.vue'
import type {
  CalculatorData,
  CalculatorStep,
  ContactForm as ContactFormType,
  RoomOption,
  ServiceCatalog,
  ServiceItem,
} from '../../../types/calculator'

const apiUrl = useRuntimeConfig().public.apiUrl

type ActiveDiscount = { id: number; itemId: number; percent: number }
const activeDiscounts = ref<ActiveDiscount[]>([])
const discountActive = ref(false)

onMounted(async () => {
  if (typeof sessionStorage === 'undefined') return
  discountActive.value = sessionStorage.getItem('discount_active') === 'true'
  if (!discountActive.value) return
  try {
    const res = await fetch(`${apiUrl}/discounts`)
    if (res.ok) activeDiscounts.value = await res.json()
  } catch {}
})

function getDiscountPercent(serviceId: string): number {
  if (!discountActive.value) return 0
  const id = Number(serviceId)
  return activeDiscounts.value.find((d) => d.itemId === id)?.percent ?? 0
}

const props = defineProps<{
  step: CalculatorStep
  isLastStep: boolean
  formData: CalculatorData
  roomOptions: RoomOption[]
  serviceCatalog: ServiceCatalog
}>()

const emit = defineEmits<{
  (e: 'complete-step', payload?: Partial<CalculatorData>): void
  (e: 'submit-form', payload: ContactFormType): void
}>()

const roomCountOptions = [1, 2, 3, 4, 5, 6]

const draft = reactive<CalculatorData>({
  roomCount: 1,
  selectedRooms: [],
  servicesByRoom: {},
  areasByRoom: {},
})

watch(
  () => [props.step.key, props.formData],
  () => {
    draft.roomCount = props.formData.roomCount
    draft.selectedRooms = [...props.formData.selectedRooms]
    draft.servicesByRoom = Object.fromEntries(
      Object.entries(props.formData.servicesByRoom).map(([key, value]) => [key, [...value]])
    )
    draft.areasByRoom = { ...props.formData.areasByRoom }
  },
  { immediate: true, deep: true }
)

const isStepValid = computed(() => {
  if (props.step.key === 'roomCount') {
    return draft.roomCount > 0
  }

  if (props.step.key === 'rooms') {
    return draft.selectedRooms.length > 0 && draft.selectedRooms.length <= props.formData.roomCount
  }

  if (props.step.key === 'services') {
    return draft.selectedRooms.length > 0 &&
      draft.selectedRooms.every((room) => (draft.servicesByRoom[room] || []).length > 0)
  }

  if (props.step.key === 'areas') {
    return draft.selectedRooms.length > 0 &&
      draft.selectedRooms.every((room) => Number(draft.areasByRoom[room]) > 0)
  }

  if (props.step.key === 'summary') {
    return true
  }

  return false
})

const grandTotalNoDiscount = computed(() =>
  props.formData.selectedRooms.reduce((acc, room) => {
    const roomServices = props.formData.servicesByRoom[room] || []
    return acc + roomServices.reduce((s, sid) => s + getServiceTotal(room, sid), 0)
  }, 0)
)

const grandTotal = computed(() =>
  props.formData.selectedRooms.reduce((acc, room) => acc + getRoomTotal(room), 0)
)

function getRoomLabel(roomValue: string) {
  return props.roomOptions.find((room) => room.value === roomValue)?.label || roomValue
}

function getRoomGroup(roomValue: string) {
  return props.roomOptions.find((room) => room.value === roomValue)?.serviceGroup || 'interior'
}

function getServicesForRoom(roomValue: string): ServiceItem[] {
  const group = getRoomGroup(roomValue)
  return props.serviceCatalog[group] || []
}

function getServiceById(roomValue: string, serviceId: string) {
  return getServicesForRoom(roomValue).find((service) => service.id === serviceId)
}

function toggleRoom(roomValue: string) {
  const exists = draft.selectedRooms.includes(roomValue)

  if (exists) {
    draft.selectedRooms = draft.selectedRooms.filter((room) => room !== roomValue)
    delete draft.servicesByRoom[roomValue]
    delete draft.areasByRoom[roomValue]
    return
  }

  if (draft.selectedRooms.length >= props.formData.roomCount) return

  draft.selectedRooms = [...draft.selectedRooms, roomValue]
}

function isServiceSelected(roomValue: string, serviceId: string) {
  return (draft.servicesByRoom[roomValue] || []).includes(serviceId)
}

function toggleService(roomValue: string, serviceId: string) {
  const current = draft.servicesByRoom[roomValue] || []

  if (current.includes(serviceId)) {
    draft.servicesByRoom = {
      ...draft.servicesByRoom,
      [roomValue]: current.filter((item) => item !== serviceId),
    }
    return
  }

  draft.servicesByRoom = {
    ...draft.servicesByRoom,
    [roomValue]: [...current, serviceId],
  }
}

function updateArea(roomValue: string, value: string) {
  draft.areasByRoom = {
    ...draft.areasByRoom,
    [roomValue]: value === '' ? '' : Number(value),
  }
}

function getServiceTotal(roomValue: string, serviceId: string) {
  const service = getServiceById(roomValue, serviceId)
  if (!service) return 0
  const area = Number(props.formData.areasByRoom[roomValue] || 0)
  return service.priceType === 'm2' ? service.price * area : service.price
}

function getServiceTotalDiscounted(roomValue: string, serviceId: string) {
  const base = getServiceTotal(roomValue, serviceId)
  const pct = getDiscountPercent(serviceId)
  return pct > 0 ? Math.round(base * (1 - pct / 100)) : base
}

function getRoomTotal(roomValue: string) {
  const roomServices = props.formData.servicesByRoom[roomValue] || []
  return roomServices.reduce((sum, serviceId) => sum + getServiceTotalDiscounted(roomValue, serviceId), 0)
}

function getServiceCalculationText(roomValue: string, serviceId: string) {
  const service = getServiceById(roomValue, serviceId)
  if (!service) return ''

  const area = Number(props.formData.areasByRoom[roomValue] || 0)

  if (service.priceType === 'm2') {
    return `${service.price}$/м² × ${area} м²`
  }

  return `Фіксована ціна: ${service.price}$`//////////////////////////////////////
}

function formatPriceLabel(service: ServiceItem) {
  if (service.priceType === 'm2') {
    return `${service.price}$/м²`
  }

  return `${service.price}$`
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`
}

function handleComplete() {
  if (!isStepValid.value) return

  if (props.step.key === 'roomCount') {
    emit('complete-step', {
      roomCount: draft.roomCount,
      selectedRooms: [],
      servicesByRoom: {},
      areasByRoom: {},
    })
    return
  }

  if (props.step.key === 'rooms') {
    const allowedRooms = draft.selectedRooms.slice(0, props.formData.roomCount)
    const filteredServices = Object.fromEntries(
      Object.entries(draft.servicesByRoom).filter(([room]) => allowedRooms.includes(room))
    )
    const filteredAreas = Object.fromEntries(
      Object.entries(draft.areasByRoom).filter(([room]) => allowedRooms.includes(room))
    )

    emit('complete-step', {
      selectedRooms: allowedRooms,
      servicesByRoom: filteredServices,
      areasByRoom: filteredAreas,
    })
    return
  }

  if (props.step.key === 'services') {
    emit('complete-step', {
      servicesByRoom: { ...draft.servicesByRoom },
    })
    return
  }

  if (props.step.key === 'areas') {
    emit('complete-step', {
      areasByRoom: { ...draft.areasByRoom },
    })
    return
  }

  if (props.step.key === 'summary') {
    emit('complete-step')
  }
}

function handleSubmitForm(payload: ContactFormType) {
  sessionStorage.removeItem('discount_active')
  discountActive.value = false
  emit('submit-form', payload)
}
</script>

<style scoped>
.step-card {
  position: relative;
  overflow: hidden;
  padding: 40px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
    var(--color-praymeri-bg);
  border: 1px solid rgba(59, 130, 246, 0.28);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  color: var(--color-praymeri-light);
}

.step-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04) 0%,
    transparent 35%,
    transparent 65%,
    rgba(59, 130, 246, 0.05) 100%
  );
}

.step-card__label {
  display: inline-flex;
  align-items: center;
  margin: 0 0 14px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(57, 163, 230, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.2);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9ec5ff;
}

.step-card__title {
  margin: 0 0 10px;
  font-size: clamp(30px, 4vw, 42px);
  font-weight: 600;
  line-height: 1.15;
  color: #ffffff;
}

.step-card__subtitle {
  margin: 0 0 10px;
  font-size: 18px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
}

.step-card__description {
  margin: 0 0 28px;
  max-width: 760px;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
}

.step-card__button {
  width: 100%;
  min-height: 58px;
  margin-top: 28px;
  border: none;
  border-radius: 18px;
  padding: 14px 20px;
  background: linear-gradient(135deg, var(--color-praymeri-blue), var(--color-praymeri-blueHover));
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.25);
}

.step-card__button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 35px rgba(59, 130, 246, 0.32);
}

.step-card__button:active:not(:disabled) {
  transform: translateY(0);
}

.step-card__button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

/* grids */
.count-grid,
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.services-box,
.areas-box,
.summary-box {
  display: grid;
  gap: 18px;
}

/* common card/button style */
.select-card,
.service-room-card,
.receipt-card,
.helper-box,
.field-group__control,
.chip-button {
  backdrop-filter: blur(10px);
}

/* selectable cards */
.select-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  color: #ffffff;
  padding: 16px 18px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.22s ease;
}

.select-card:hover {
  border-color: rgba(59, 130, 246, 0.45);
  background: linear-gradient(180deg, rgba(59,130,246,0.12), rgba(255,255,255,0.03));
  transform: translateY(-2px);
}

.select-card--active {
  border-color: var(--color-praymeri-blue);
  background: linear-gradient(180deg, rgba(59,130,246,0.22), rgba(59,130,246,0.1));
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.2);
  color: #fff;
}

/* helper */
.helper-box {
  margin-bottom: 18px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: rgba(57, 163, 230, 0.08);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.55;
}

.helper-box strong {
  color: #fff;
}

/* services */
.service-room-card {
  padding: 22px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}

.service-room-card__title {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 500;
  color: #fff;
}

.chips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}

.chip-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-height: 90px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: #fff;
  text-align: left;
  cursor: pointer;
  transition: all 0.22s ease;
}

.chip-button:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.08);
}

.chip-button--active {
  border-color: var(--color-praymeri-blue);
  background: linear-gradient(180deg, rgba(59,130,246,0.22), rgba(59,130,246,0.1));
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.18);
}

.chip-button__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
}

.chip-button__price {
  font-size: 13px;
  color: rgba(255,255,255,0.68);
}

/* fields */
.field-group {
  display: grid;
  gap: 8px;
}

.field-group__label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.84);
}

.field-group__control {
  width: 100%;
  min-height: 58px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  padding: 14px 16px;
  font-size: 16px;
  color: #fff;
  outline: none;
  transition: all 0.2s ease;
}

.field-group__control::placeholder {
  color: rgba(255,255,255,0.35);
}

.field-group__control:focus {
  border-color: rgba(59, 130, 246, 0.55);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background: rgba(255,255,255,0.06);
}

/* summary */
.receipt-card {
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.08);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02));
}

.receipt-card__row,
.receipt-room__head,
.receipt-line,
.receipt-room__subtotal,
.receipt-total {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.receipt-card__row {
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.82);
}

.receipt-room + .receipt-room {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.receipt-room__head {
  margin-bottom: 12px;
}

.receipt-room__head h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.receipt-room__head span {
  white-space: nowrap;
  color: rgba(255,255,255,0.55);
  font-weight: 500;
}

.receipt-line {
  padding: 12px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.receipt-line__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.receipt-line__info strong {
  font-size: 15px;
  color: #fff;
}

.receipt-line__info small {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
}

.receipt-line__price {
  white-space: nowrap;
  font-weight: 700;
  color: #9ec5ff;
}

.receipt-room__subtotal {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.78);
}

.receipt-room__subtotal strong {
  color: #fff;
}

.receipt-total {
  margin-top: 22px;
  padding-top: 20px;
  border-top: 2px solid rgba(59, 130, 246, 0.22);
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.receipt-total strong {
  color: #9ec5ff;
  font-size: 24px;
}

.receipt-discount-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.18);
  color: #34d399;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(34, 197, 94, 0.3);
  margin-top: 2px;
}

.receipt-line__price-original {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.38);
  text-decoration: line-through;
  margin-bottom: 2px;
}

.receipt-savings {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #34d399;
  font-weight: 600;
}

.receipt-savings strong {
  font-size: 18px;
  color: #34d399;
}

/* mobile */
@media (max-width: 992px) {
  .count-grid,
  .rooms-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .step-card {
    padding: 22px;
    border-radius: 22px;
  }

  .step-card__title {
    font-size: 28px;
  }

  .step-card__subtitle {
    font-size: 16px;
  }

  .step-card__description {
    font-size: 15px;
    margin-bottom: 22px;
  }

  .count-grid,
  .rooms-grid,
  .chips-grid {
    grid-template-columns: 1fr;
  }

  .service-room-card,
  .receipt-card {
    padding: 18px;
    border-radius: 18px;
  }

  .receipt-card__row,
  .receipt-room__head,
  .receipt-line,
  .receipt-room__subtotal,
  .receipt-total {
    flex-direction: column;
    align-items: flex-start;
  }

  .receipt-line__price,
  .receipt-room__head span {
    white-space: normal;
  }

  .step-card__button {
    min-height: 54px;
    border-radius: 16px;
  }
}
</style>
