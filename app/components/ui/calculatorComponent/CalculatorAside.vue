<template>
  <aside class="calculator-aside">
    <div class="calculator-aside__overlay">
      <p class="calculator-aside__caption">Construction & Remodeling Services</p>
      <h2 class="calculator-aside__title">Renovation Cost Calculator</h2>
      <p class="calculator-aside__text">
        Easily estimate your renovation cost in just a few steps — select rooms, choose services, and get a detailed quote ready to submit.
      </p>

      <ul class="calculator-aside__list">
        <li>Select the number of rooms</li>
        <li>Choose services for each room</li>
        <li>Get a detailed quote before submitting</li>
      </ul>

      <div v-if="hasSelections" class="aside-selection">
        <h3 class="aside-selection__title">Your Selection</h3>

        <div class="aside-row">
          <span>Rooms planned</span>
          <strong>{{ formData.roomCount }}</strong>
        </div>

        <div
          v-for="room in formData.selectedRooms"
          :key="room"
          class="aside-room"
        >
          <div class="aside-room__header">
            <span class="aside-room__name">{{ getRoomLabel(room) }}</span>
            <span v-if="formData.areasByRoom[room]" class="aside-room__area">
              {{ formData.areasByRoom[room] }} sq ft
            </span>
          </div>
          <div v-if="(formData.servicesByRoom[room] || []).length > 0" class="aside-room__services">
            {{ (formData.servicesByRoom[room] || []).length }} service(s) selected
          </div>
        </div>

        <p class="aside-currency">All prices in USD</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalculatorData, RoomOption } from '../../../types/calculator'

const props = defineProps<{
  currentStep: number
  formData: CalculatorData
  roomOptions: RoomOption[]
}>()

const hasSelections = computed(() =>
  props.formData.selectedRooms.length > 0 || props.currentStep > 1
)

function getRoomLabel(roomValue: string) {
  return props.roomOptions.find((r) => r.value === roomValue)?.label || roomValue
}
</script>

<style scoped>
.calculator-aside {
  min-height: 760px;
  border-radius: 32px;
  overflow: hidden;
  background:
    linear-gradient(rgba(24, 20, 16, 0.42), rgba(24, 20, 16, 0.42)),
    url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
  box-shadow: var(--shadow);
  display: flex;
  align-items: end;
}

.calculator-aside__overlay {
  padding: 40px;
  color: var(--color-praymeri-light)
}

.calculator-aside__caption {
  margin: 0 0 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--color-praymeri-light);
}

.calculator-aside__title {
  margin: 0 0 12px;
  font-size: var( --font-s-h3);
  line-height: 1.05;
}

.calculator-aside__text {
  margin: 0 0 20px;
  max-width: 460px;
  line-height: 1.6;
  color: var(--color-praymeri-light);
}

.calculator-aside__list {
  margin: 0;
  padding-left: 18px;
  color: var(--color-praymeri-light);
  display: grid;
  gap: 8px;
}

.aside-selection {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.aside-selection__title {
  margin: 0 0 14px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.55);
}

.aside-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 14px;
  color: var(--color-praymeri-light);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.aside-room {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.aside-room__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aside-room__name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-praymeri-light);
}

.aside-room__area {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.aside-room__services {
  margin-top: 3px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.aside-currency {
  margin: 14px 0 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 1100px) {
  .calculator-aside {
    min-height: 420px;
  }
}

@media (max-width: 720px) {
  .calculator-aside__title {
    font-size: 26px;
  }

  .calculator-aside__overlay {
    padding: 24px;
  }
}
</style>
