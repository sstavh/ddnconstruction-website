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
import type { CalculatorStep, ContactForm } from '../types/calculator'

const steps = reactive<CalculatorStep[]>([
  {
    id: 1,
    title: 'Оберіть місто',
    subtitle: 'Локація для розрахунку',
    description: 'Вкажіть місто, де планується ремонт.',
    buttonText: 'Підтвердити місто',
    shortText: 'Оберіть місто для старту розрахунку.',
    completed: false,
    fields: [
      {
        key: 'city',
        label: 'Місто',
        type: 'select',
        placeholder: 'Оберіть місто',
        options: ['Київ', 'Львів', 'Одеса', 'Дніпро'],
      },
    ],
  },
  {
    id: 2,
    title: 'Статус об’єкта',
    subtitle: 'Тип нерухомості',
    description: 'Оберіть, який саме у вас об’єкт.',
    buttonText: 'Підтвердити статус',
    shortText: 'Вкажіть статус об’єкта.',
    completed: false,
    fields: [
      {
        key: 'objectStatus',
        label: 'Статус об’єкта',
        type: 'radio',
        options: ['Новобудова', 'Вторинне житло', 'Приватний будинок'],
      },
    ],
  },
  {
    id: 3,
    title: 'Площа приміщення',
    subtitle: 'Основний параметр',
    description: 'Вкажіть площу в квадратних метрах.',
    buttonText: 'Зберегти площу',
    shortText: 'Додайте площу приміщення.',
    completed: false,
    fields: [
      {
        key: 'area',
        label: 'Площа, м²',
        type: 'number',
        placeholder: 'Наприклад 65',
      },
    ],
  },
  {
    id: 4,
    title: 'Кількість кімнат',
    subtitle: 'Планування об’єкта',
    description: 'Оберіть або введіть кількість кімнат.',
    buttonText: 'Підтвердити дані',
    shortText: 'Вкажіть кількість кімнат.',
    completed: false,
    fields: [
      {
        key: 'rooms',
        label: 'Кількість кімнат',
        type: 'radio',
        options: ['1', '2', '3', '4+'],
      },
    ],
  },
  {
    id: 5,
    title: 'Тип ремонту',
    subtitle: 'Формат робіт',
    description: 'Оберіть, який рівень ремонту вас цікавить.',
    buttonText: 'Підтвердити тип ремонту',
    shortText: 'Оберіть формат ремонту.',
    completed: false,
    fields: [
      {
        key: 'repairType',
        label: 'Тип ремонту',
        type: 'radio',
        options: ['Косметичний', 'Капітальний', 'Дизайнерський'],
      },
    ],
  },
  {
    id: 6,
    title: 'Контактні дані',
    subtitle: 'Отримати розрахунок',
    description: 'Залиште контакти, щоб отримати вартість ремонту.',
    buttonText: 'Надіслати форму',
    shortText: 'Залиште контакти для отримання результату.',
    completed: false,
    fields: [],
  },
])

const currentStep = ref(0)

const calculatorForm = reactive<Record<string, string | number>>({
  city: '',
  objectStatus: '',
  area: '',
  rooms: '',
  repairType: '',
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

function completeStep(payload?: Record<string, string | number>) {
  if (payload) Object.assign(calculatorForm, payload)

  steps[currentStep.value].completed = true

  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1
  }
}

function submitForm(payload: ContactForm) {
  Object.assign(contactForm, payload)
  steps[currentStep.value].completed = true

  console.log('Calculator submit:', {
    calculator: calculatorForm,
    contacts: contactForm,
  })
}
</script>

<style>:root {
  --bg: #f4f1ea;
  --surface: #ffffff;
  --border: #e5ddd0;
  --text: #1e1a16;
  --muted: #7a7066;
  --accent: #1d1d1d;
  --accent-2: #c7a97f;
  --shadow: 0 24px 60px rgba(30, 26, 22, 0.08);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  background: linear-gradient(180deg, #f6f2eb 0%, #efe7da 100%);
  color: var(--text);
}

button,
input,
textarea,
select {
  font: inherit;
}

.calculator-page {
  min-height: 100vh;
  padding: 24px;
}

.page-header {
  max-width: 1320px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.page-header__label {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
}

.page-header__title {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
}

.page-header__actions {
  display: flex;
  gap: 12px;
}

.top-button {
  min-width: 120px;
  border-radius: 999px;
  padding: 14px 18px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.top-button--light {
  background: #fff;
  border: 1px solid var(--border);
}

.top-button--dark {
  background: var(--accent);
  color: #fff;
}

.top-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.calculator-layout {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 560px;
  gap: 24px;
  align-items: stretch;
}

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
  color: #fff;
}

.calculator-aside__caption {
  margin: 0 0 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,0.74);
}

.calculator-aside__title {
  margin: 0 0 12px;
  font-size: 42px;
  line-height: 1.05;
}

.calculator-aside__text {
  margin: 0 0 20px;
  max-width: 460px;
  line-height: 1.6;
  color: rgba(255,255,255,0.88);
}

.calculator-aside__list {
  margin: 0;
  padding-left: 18px;
  color: rgba(255,255,255,0.88);
  display: grid;
  gap: 8px;
}

.calculator-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.step-progress {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.step-progress__item {
  height: 8px;
  border-radius: 999px;
  background: rgba(29,29,29,0.12);
  overflow: hidden;
}

.step-progress__item--active,
.step-progress__item--done {
  background: var(--accent-2);
}

.step-progress__number {
  display: none;
}

.step-card {
  background: rgba(255,255,255,0.96);
  border: 1px solid rgba(229,221,208,0.9);
  border-radius: 32px;
  padding: 34px;
  box-shadow: var(--shadow);
}

.step-card__label {
  margin: 0 0 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--muted);
}

.step-card__title {
  margin: 0 0 8px;
  font-size: 32px;
}

.step-card__subtitle {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 18px;
}

.step-card__description {
  margin: 0 0 24px;
  line-height: 1.65;
  color: #544c43;
}

.fields-box,
.contact-form {
  display: grid;
  gap: 18px;
}

.field-group {
  display: grid;
  gap: 8px;
}

.field-group__label {
  font-size: 14px;
  font-weight: 600;
}

.field-group__control {
  width: 100%;
  min-height: 56px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #fff;
  padding: 14px 16px;
  outline: none;
}

.field-group__control--textarea {
  min-height: 120px;
  resize: vertical;
}

.radio-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.radio-grid__item {
  min-height: 58px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: #fff;
  padding: 14px 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.radio-grid__item:hover {
  border-color: var(--accent-2);
}

.step-card__button {
  width: 100%;
  margin-top: 22px;
  min-height: 58px;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  font-weight: 700;
}

.steps-info {
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(229,221,208,0.9);
  border-radius: 28px;
  padding: 20px;
}

.steps-info__row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.steps-info__item {
  text-align: center;
}

.steps-info__dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d7cabc;
  margin-bottom: 10px;
}

.steps-info__dot--active {
  background: #1d1d1d;
}

.steps-info__dot--done {
  background: var(--accent-2);
}

.steps-info__text {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
}

@media (max-width: 1100px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }

  .calculator-aside {
    min-height: 420px;
  }
}

@media (max-width: 720px) {
  .calculator-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .page-header__title {
    font-size: 28px;
  }

  .step-card,
  .steps-info {
    padding: 20px;
  }

  .step-card__title,
  .calculator-aside__title {
    font-size: 26px;
  }

  .radio-grid,
  .steps-info__row {
    grid-template-columns: 1fr;
  }

  .step-progress {
    grid-template-columns: repeat(6, 1fr);
  }
}




</style>