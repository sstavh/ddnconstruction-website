<script lang="ts" setup>
console.log("good work Reviews");
import ReviewsCompTest from '~/components/ui/ReviewsCompTest.vue';
const reviews: Review[] = [
  { id: 1, name: 'Іваненко Олена', rating: 5, text: 'Дуже задоволена результатом.', avatarColor: '#f97316' },
  { id: 2, name: 'Петренко Андрій', rating: 4, text: 'Все чудово, рекомендую.', avatarColor: '#3b82f6' },
  { id: 3, name: 'Шевченко Марія', rating: 5, text: 'Якість на висоті!', avatarColor: '#22c55e' },
  { id: 4, name: 'Коваль Максим', rating: 5, text: 'Відмінний сервіс.', avatarColor: '#a855f7' },
  { id: 5, name: 'Бондар Наталія', rating: 4, text: 'Було кілька правок — ок.', avatarColor: '#ef4444' },
  { id: 6, name: 'Мельник Сергій', rating: 5, text: 'Швидко та професійно.', avatarColor: '#06b6d4' },
  { id: 7, name: 'Ткаченко Ірина', rating: 5, text: 'Дуже приємна співпраця.', avatarColor: '#84cc16' },
  { id: 8, name: 'Романюк Владислав', rating: 4, text: 'Результат супер.', avatarColor: '#f59e0b' },
  { id: 9, name: 'Гриценко Юлія', rating: 5, text: 'Все дуже круто!', avatarColor: '#6366f1' },
  { id: 10, name: 'Савчук Денис', rating: 5, text: 'Топ. Рекомендую.', avatarColor: '#14b8a6' },
]

</script>

<template>
<div class="container">
    <ReviewsCompTest
      title="Відгуки"
      subtitle="Три відгуки одночасно, автоперемикання 30 секунд"
      :reviews="reviews"
      :visible-count="3"
      :interval-ms="30000"
      :transition-ms="450"
    />
  </div>
</template>
<style scoped>

</style>