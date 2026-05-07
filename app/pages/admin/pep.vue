<template>
  <!-- Твоя форма тут -->

  <!-- Таблиця лідів -->
  <div>
    <h2>Заявки</h2>
    <div v-if="loadError" style="color: red; margin-bottom: 1rem;">
      {{ loadError }}
    </div>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ім'я</th>
          <th>Прізвище</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Роботи</th>
          <th>Області</th>
          <th>Коментар</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead.id">
          <td>{{ lead.id }}</td>
          <td>{{ lead.firstName }}</td>
          <td>{{ lead.lastName }}</td>
          <td>{{ lead.email }}</td>
          <td>{{ lead.phone }}</td>
          <td>{{ lead.jobs?.join(', ') ?? '' }}</td>
          <td>{{ JSON.stringify(lead.areas) }}</td>
          <td>{{ lead.comment }}</td>
          <td>{{ new Date(lead.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin-auth' })
import { ref, onMounted } from 'vue'

const apiUrl = useRuntimeConfig().public.apiUrl || 'http://127.0.0.1:3001'
const leads = ref([])
const loadError = ref(null)

const loadLeads = async () => {
  try {
    loadError.value = null
    const response = await fetch(`${apiUrl}/leads`)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }
    leads.value = await response.json()
  } catch (error) {
    console.error('Помилка завантаження лідів:', error)
    loadError.value = error instanceof Error ? error.message : String(error)
  }
}

const handleSubmit = async () => {
  // Твій існуючий код відправки форми
  // Після успіху:
  await loadLeads()
}

onMounted(loadLeads)
</script>