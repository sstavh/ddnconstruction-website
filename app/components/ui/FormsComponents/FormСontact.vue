<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="grid">
      <label class="field">
        <span class="label">Прізвище</span>
        <input
          v-model.trim="form.lastName"
          class="input"
          type="text"
          name="lastName"
          autocomplete="family-name"
          placeholder="Напр., Іваненко"
          required
        />
      </label>

      <label class="field">
        <span class="label">Імʼя</span>
        <input
          v-model.trim="form.firstName"
          class="input"
          type="text"
          name="firstName"
          autocomplete="given-name"
          placeholder="Напр., Олег"
          required
        />
      </label>

      <label class="field">
        <span class="label">Пошта</span>
        <input
          v-model.trim="form.email"
          class="input"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="name@example.com"
          required
        />
      </label>

      <label class="field">
        <span class="label">Номер телефону</span>
        <input
          v-model.trim="form.phone"
          class="input"
          type="tel"
          name="phone"
          autocomplete="tel"
          placeholder="+380..."
          required
        />
      </label>
    </div>

    <!-- Dropdown (multiselect) - стартово закритий і не зсуває секції нижче -->
    <section class="accordion">
      <div class="accordionHead">
        <button
          type="button"
          class="accordionBtn"
          :aria-expanded="jobsOpen ? 'true' : 'false'"
          aria-controls="jobs-panel"
          @click="jobsOpen = !jobsOpen"
        >
          <span class="accordionTitle">Вибір робіт</span>
          <span class="accordionHint">
            {{ form.jobs.length ? `Вибрано: ${form.jobs.length}` : "Нічого не вибрано" }}
          </span>
          <span class="chev" :class="{ open: jobsOpen }" aria-hidden="true">▾</span>
        </button>

        <div
          v-show="jobsOpen"
          id="jobs-panel"
          class="accordionBody dropdown"
          role="region"
          aria-label="Вибір робіт"
        >
          <p class="help">
            Можна вибрати декілька варіантів. Після вибору нижче з’являться поля для площі (м²).
          </p>

          <div class="jobs">
            <label v-for="job in jobOptions" :key="job.id" class="jobItem">
              <input class="checkbox" type="checkbox" :value="job.id" v-model="form.jobs" />
              <span class="jobName">{{ job.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic area inputs -->
    <section class="areas">
      <h3 class="subtitle">Площа (м²)</h3>

      <div v-if="!form.jobs.length" class="empty">
        Спочатку виберіть тип робіт у блоці “Вибір робіт”.
      </div>

      <div v-else class="areasGrid">
        <label v-for="jobId in form.jobs" :key="jobId" class="field">
          <span class="label">
            Квадратні метри — <b>{{ jobLabel(jobId) }}</b>
          </span>

          <input
            class="input"
            type="number"
            inputmode="decimal"
            min="0"
            step="0.1"
            :name="`area_${jobId}`"
            v-model.number="form.areas[jobId]"
            placeholder="Напр., 12.5"
            required
          />
        </label>
      </div>
    </section>

    <label class="field">
      <span class="label">Коментар (необов’язково)</span>
      <textarea
        v-model.trim="form.comment"
        class="textarea"
        name="comment"
        rows="4"
        placeholder="Коротко опишіть задачу, адресу/місто, терміни тощо..."
      />
    </label>

    <div class="actions">
      <button class="btn" type="submit" :disabled="submitting">
        {{ submitting ? "Надсилаємо..." : "Надіслати заявку" }}
      </button>

      <p v-if="error" class="error" role="status">{{ error }}</p>
      <p v-if="success" class="success" role="status">{{ success }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
type JobOption = { id: string; label: string }

const jobOptions: JobOption[] = [
  { id: "tile", label: "Плитка" },
  { id: "walls", label: "Стіни (шпаклівка/фарба)" },
  { id: "floor", label: "Підлога (стяжка/ламінат)" },
  { id: "bathroom", label: "Санвузол під ключ" },
  { id: "other", label: "Інше" },
]

// ✅ стартово закритий
const jobsOpen = ref(false)

const submitting = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const form = reactive({
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  jobs: [] as string[],
  areas: {} as Record<string, number | null>,
  comment: "",
})

function jobLabel(jobId: string): string {
  return jobOptions.find((j) => j.id === jobId)?.label ?? jobId
}

// Коли вибір робіт змінюється — додаємо/прибираємо поля площі
watch(
  () => [...form.jobs],
  (jobs) => {
    for (const id of jobs) {
      if (!(id in form.areas)) form.areas[id] = null
    }
    for (const key of Object.keys(form.areas)) {
      if (!jobs.includes(key)) delete form.areas[key]
    }
  },
  { immediate: true }
)

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isPhoneLikelyValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, "")
  return digits.length >= 9
}

async function handleSubmit() {
  error.value = null
  success.value = null

  if (!isEmailValid(form.email)) {
    error.value = "Перевірте, будь ласка, правильність пошти."
    return
  }
  if (!isPhoneLikelyValid(form.phone)) {
    error.value = "Перевірте, будь ласка, номер телефону."
    return
  }
  if (!form.jobs.length) {
    error.value = "Оберіть хоча б один тип робіт."
    return
  }
  for (const jobId of form.jobs) {
    const v = form.areas[jobId]
    if (v === null || Number.isNaN(v) || v < 0) {
      error.value = `Вкажіть площу (м²) для: ${jobLabel(jobId)}`
      return
    }
  }

  submitting.value = true
  try {
    // Приклад: await $fetch('/api/lead', { method: 'POST', body: { ...form } })
    console.log("SUBMIT", JSON.parse(JSON.stringify(form)))
    success.value = "Дякуємо! Ми зв’яжемось з вами найближчим часом."
  } catch {
    error.value = "Не вдалося надіслати форму. Спробуйте ще раз."
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form {
    margin-top: 70px;
  width: 580px;
  padding: 30px;
  border: 1px solid rgb(247, 247, 247);
  border-radius: 16px;
  background: rgb(233, 232, 232);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}


.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 14px;
}

@media (min-width: 720px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: grid;
  gap: 6px;
}

.label {
    font-size: var(--font-s-button);
}

.input,
.textarea {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 11px 12px;
  font-size: 16px;
  outline: none;
}

.input:focus,
.textarea:focus {
  border-color: #9c9c9c;
}

/* Dropdown container */
.accordion {
  margin: 10px 0 14px;
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  background: #fafafa;
}

/* relative anchor for absolute dropdown */
.accordionHead {
  position: relative;
  border-radius: 16px;
}

.accordionBtn {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 12px 14px;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
  border-radius: 16px;
}

.accordionTitle {
  font-weight: 700;
}

.accordionHint {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
}

.chev {
  font-size: 16px;
  transform: rotate(0deg);
  transition: transform 0.15s ease;
}

.chev.open {
  transform: rotate(180deg);
}

/* ✅ absolute dropdown: doesn't move content below */
.accordionBody.dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  z-index: 50;

  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  padding: 12px 14px 14px;

  max-height: 260px;
  overflow: auto;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.help {
  margin: 0 0 10px;
  font-size: 13px;
  color: #666;
}

.jobs {
  display: grid;
  gap: 8px;
}

.jobItem {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #ededed;
  border-radius: 12px;
}

.checkbox {
  width: 18px;
  height: 18px;
}

.jobName {
  font-size: 15px;
}

.areas {
  margin: 14px 0;
  padding: 12px 14px 14px;
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  background: #fff;
}

.subtitle {
  margin: 0 0 10px;
  font-size: 16px;
}

.empty {
  font-size: 14px;
  color: #666;
}

.areasGrid {
  display: grid;
  gap: 12px;
}

@media (min-width: 720px) {
  .areasGrid {
    grid-template-columns: 1fr 1fr;
  }
}

.actions {
  margin-top: 14px;
  display: grid;
  gap: 10px;
}

.btn {
  border: 0;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 16px;
  cursor: pointer;
  background: #111;
  color: #fff;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #b00020;
  margin: 0;
  font-size: 14px;
}

.success {
  color: #0a7a2f;
  margin: 0;
  font-size: 14px;
}
</style>