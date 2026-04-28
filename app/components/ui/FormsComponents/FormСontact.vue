```vue
<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="grid">
      <label class="field">
        <span class="label">Last Name</span>
        <input
          v-model.trim="form.lastName"
          class="input"
          type="text"
          name="lastName"
          autocomplete="family-name"
          placeholder="e.g., Smith"
          required
        />
      </label>

      <label class="field">
        <span class="label">First Name</span>
        <input
          v-model.trim="form.firstName"
          class="input"
          type="text"
          name="firstName"
          autocomplete="given-name"
          placeholder="e.g., John"
          required
        />
      </label>

      <label class="field">
        <span class="label">Email</span>
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
        <span class="label">Phone Number</span>
        <input
          v-model.trim="form.phone"
          class="input"
          type="tel"
          name="phone"
          autocomplete="tel"
          placeholder="+1..."
          required
        />
      </label>
    </div>

    <section class="accordion">
      <div class="accordionHead">
        <button
          type="button"
          class="accordionBtn"
          :aria-expanded="jobsOpen ? 'true' : 'false'"
          aria-controls="jobs-panel"
          @click="jobsOpen = !jobsOpen"
        >
          <span class="accordionTitle">Select Services</span>
          <span class="accordionHint">
            {{ form.jobs.length ? `Selected: ${form.jobs.length}` : "Nothing selected" }}
          </span>
          <span class="chev" :class="{ open: jobsOpen }" aria-hidden="true">▾</span>
        </button>

        <div
          v-show="jobsOpen"
          id="jobs-panel"
          class="accordionBody dropdown"
          role="region"
          aria-label="Select Services"
        >
          <p class="help">
            You can select multiple options. After selecting, area fields (sq ft) will appear below.
          </p>

          <div class="jobs">
            <label v-for="job in jobOptions" :key="job.id" class="jobItem">
              <input
                class="checkbox"
                type="checkbox"
                :value="job.id"
                v-model="form.jobs"
              />
              <span class="jobName">{{ job.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <section class="areas">
      <h3 class="subtitle">Area (sq ft)</h3>

      <div v-if="!form.jobs.length" class="empty">
        First select a service type in the “Select Services” section.
      </div>

      <div v-else class="areasGrid">
        <label v-for="jobId in form.jobs" :key="jobId" class="field">
          <span class="label">
            Square feet — <b>{{ jobLabel(jobId) }}</b>
          </span>

          <input
            class="input"
            type="number"
            inputmode="decimal"
            min="0"
            step="0.1"
            :name="`area_${jobId}`"
            v-model.number="form.areas[jobId]"
            placeholder="e.g., 120"
            required
          />
        </label>
      </div>
    </section>

    <label class="field">
      <span class="label">Comment (optional)</span>
      <textarea
        v-model.trim="form.comment"
        class="textarea"
        name="comment"
        rows="4"
        placeholder="Briefly describe the project, address/city, timeline, etc..."
      />
    </label>

    <div class="actions">
      <button class="btn" type="submit" :disabled="submitting">
        {{ submitting ? "Sending..." : "Submit Request" }}
      </button>

      <p v-if="error" class="error" role="status">{{ error }}</p>
      <p v-if="success" class="success" role="status">{{ success }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"

type JobOption = { id: string; label: string }

const jobOptions: JobOption[] = [
  { id: "kitchen_remodeling", label: "Kitchen Remodeling" },
  { id: "bathroom_remodeling", label: "Bathroom Remodeling (Turnkey)" },
  { id: "tile_installation", label: "Tile Installation" },
  { id: "flooring", label: "Flooring (Laminate / Vinyl / Hardwood)" },
  { id: "drywall_painting", label: "Drywall & Painting" },
  { id: "electrical_work", label: "Electrical Work" },
  { id: "plumbing_services", label: "Plumbing Services" },
  { id: "demolition", label: "Demolition" },
  { id: "full_interior_remodeling", label: "Full Interior Remodeling" },
  { id: "other", label: "Other" },
]

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

const apiUrl = useRuntimeConfig().public.apiUrl

async function handleSubmit() {
  error.value = null
  success.value = null

  if (!isEmailValid(form.email)) {
    error.value = "Please check that your email is correct."
    return
  }

  if (!isPhoneLikelyValid(form.phone)) {
    error.value = "Please check your phone number."
    return
  }

  if (!form.jobs.length) {
    error.value = "Please select at least one service."
    return
  }

  for (const jobId of form.jobs) {
    const v = form.areas[jobId]

    if (v === null || Number.isNaN(v) || v < 0) {
      error.value = `Please enter the area (sq ft) for: ${jobLabel(jobId)}`
      return
    }
  }

  submitting.value = true

  try {
    const response = await fetch(`${apiUrl}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        areas: Object.fromEntries(
          Object.entries(form.areas).map(([k, v]) => [k, v ?? 0])
        ),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit the form")
    }

    const data = await response.json()
    console.log("Lead saved:", data)

    success.value = "Thank you! We will contact you shortly."

    form.lastName = ""
    form.firstName = ""
    form.email = ""
    form.phone = ""
    form.jobs = []
    form.areas = {}
    form.comment = ""
    jobsOpen.value = false
  } catch (e) {
    console.error(e)
    error.value = "Failed to submit the form. Please try again."
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form {
  margin-top: 70px;
  width: 580px;
  padding: 28px;
  border-radius: 22px;

  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 40%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);

  border: 1px solid rgba(59, 130, 246, 0.22);
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255,255,255,0.04);

  color: #fff;
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
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
}

.input,
.textarea {
  width: 100%;
  min-height: 52px;

  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.04);
  color: #fff;

  padding: 12px 14px;
  font-size: 15px;

  outline: none;
  transition: all 0.22s ease;

  backdrop-filter: blur(10px);
}

.textarea {
  min-height: 120px;
  resize: vertical;
}

.input::placeholder,
.textarea::placeholder {
  color: rgba(255,255,255,0.35);
}

.input:focus,
.textarea:focus {
  border-color: rgba(59, 130, 246, 0.55);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background: rgba(255,255,255,0.06);
}

.accordion {
  margin: 14px 0;
  border-radius: 18px;

  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
}

.accordionHead {
  position: relative;
}

.accordionBtn {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;

  padding: 14px 16px;
  border: 0;
  cursor: pointer;

  background: transparent;
  color: #fff;
  text-align: left;
}

.accordionTitle {
  font-weight: 600;
  font-size: 15px;
}

.accordionHint {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  white-space: nowrap;
}

.chev {
  transition: transform 0.2s ease;
  color: rgba(255,255,255,0.7);
}

.chev.open {
  transform: rotate(180deg);
}

.accordionBody.dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  z-index: 50;

  border-radius: 18px;
  padding: 14px;

  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(20, 20, 20, 0.95);

  backdrop-filter: blur(14px);
  box-shadow: 0 18px 50px rgba(0,0,0,0.4);

  max-height: 260px;
  overflow: auto;
}

.help {
  margin: 0 0 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
}

.jobs {
  display: grid;
  gap: 8px;
}

.jobItem {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 12px;
  border-radius: 14px;

  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);

  transition: 0.2s ease;
}

.jobItem:hover {
  border-color: rgba(59, 130, 246, 0.25);
  background: rgba(59, 130, 246, 0.06);
}

.checkbox {
  width: 16px;
  height: 16px;
}

.jobName {
  font-size: 14px;
  color: rgba(255,255,255,0.85);
}

.areas {
  margin: 14px 0;
  padding: 16px;
  border-radius: 18px;

  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
}

.subtitle {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.empty {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
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
  margin-top: 16px;
  display: grid;
  gap: 10px;
}

.btn {
  border: none;
  border-radius: 16px;
  padding: 14px 16px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  color: #fff;

  background: linear-gradient(135deg, var(--color-praymeri-blue), var(--color-praymeri-blueHover));
  box-shadow: 0 10px 28px rgba(59, 130, 246, 0.25);

  transition: all 0.25s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(59, 130, 246, 0.32);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

.error {
  color: #ff6b6b;
  margin: 0;
  font-size: 13px;
}

.success {
  color: #4ade80;
  margin: 0;
  font-size: 13px;
}

@media (max-width: 720px) {
  .form {
    width: 100%;
    margin-top: 30px;
    padding: 20px;
    border-radius: 18px;
  }
}

@media (max-width: 430px) {
  .form {
    width: 360px;
    margin-top: 24px;
    padding: 16px;
    border-radius: 16px;
  }

  .accordionBtn {
    grid-template-columns: 1fr auto;
    gap: 6px;
  }

  .accordionHint {
    display: none;
  }

  .input,
  .textarea {
    font-size: 14px;
    padding: 10px 12px;
  }

  .btn {
    padding: 12px;
    font-size: 14px;
  }

  .areas {
    padding: 12px;
  }

  .accordionBody.dropdown {
    max-height: 220px;
    padding: 12px;
  }
}
</style>
```
