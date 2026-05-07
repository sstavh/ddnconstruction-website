<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' })
import { onMounted, ref } from 'vue'

type CalculatorLead = {
  id: number
  name: string
  phone: string
  email?: string
  comment?: string
  roomCount: number
  selectedRooms: string[]
  servicesByRoom: Record<string, string[]>
  areasByRoom: Record<string, number>
  createdAt: string
}

const apiUrl = useRuntimeConfig().public.apiUrl
const leads = ref<CalculatorLead[]>([])
const loading = ref(false)
const errorMessage = ref('')

const loadLeads = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`${apiUrl}/calculator-leads`)
    if (!response.ok) throw new Error('Не вдалося завантажити заявки')
    leads.value = await response.json()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

onMounted(loadLeads)

function formatServices(servicesByRoom: Record<string, string[]>) {
  return Object.entries(servicesByRoom)
    .map(([room, services]) => `${room}: ${services.join(', ')}`)
    .join(' | ')
}

function formatAreas(areasByRoom: Record<string, number>) {
  return Object.entries(areasByRoom)
    .map(([room, area]) => `${room}: ${area} sq ft`)
    .join(' | ')
}
</script>

<template>
  <section class="leads-page">
    <h1>Заявки калькулятора</h1>

    <div v-if="loading" class="status">Завантаження...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

    <table v-else class="leads-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ім'я</th>
          <th>Телефон</th>
          <th>Email</th>
          <th>Кімнат</th>
          <th>Кімнати</th>
          <th>Послуги</th>
          <th>Площі</th>
          <th>Коментар</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead.id">
          <td>{{ lead.id }}</td>
          <td>{{ lead.name }}</td>
          <td>{{ lead.phone }}</td>
          <td>{{ lead.email || '—' }}</td>
          <td>{{ lead.roomCount }}</td>
          <td>{{ lead.selectedRooms.join(', ') }}</td>
          <td>{{ formatServices(lead.servicesByRoom) }}</td>
          <td>{{ formatAreas(lead.areasByRoom) }}</td>
          <td>{{ lead.comment || '—' }}</td>
          <td>{{ new Date(lead.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.leads-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.status {
  margin: 18px 0;
  color: #0ea5e9;
}

.error {
  margin: 18px 0;
  color: #ef4444;
}

.leads-table {
  width: 100%;
  border-collapse: collapse;
}

.leads-table th,
.leads-table td {
  padding: 12px 10px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  text-align: left;
  vertical-align: top;
}

.leads-table th {
  background: rgba(15, 23, 42, 0.9);
  color: #f8fafc;
}

.leads-table tbody tr:nth-child(odd) {
  background: rgba(255, 255, 255, 0.03);
}
</style>
