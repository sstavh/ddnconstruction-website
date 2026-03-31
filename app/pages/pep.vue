<template>
  <!-- Твоя форма тут -->

  <!-- Таблиця лідів -->
  <div>
    <h2>Заявки</h2>
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
          <td>{{ lead.jobs.join(', ') }}</td>
          <td>{{ JSON.stringify(lead.areas) }}</td>
          <td>{{ lead.comment }}</td>
          <td>{{ new Date(lead.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leads: [],
    };
  },
  async mounted() {
    await this.loadLeads();
  },
  methods: {
    async loadLeads() {
      try {
        const response = await fetch('http://localhost:3001/leads');
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        this.leads = await response.json();
      } catch (error) {
        console.error('Помилка завантаження лідів:', error);
      }
    },
    async handleSubmit() {
      // Твій існуючий код відправки форми
      // Після успіху:
      await this.loadLeads(); // Оновити таблицю
    },
  },
};
</script>