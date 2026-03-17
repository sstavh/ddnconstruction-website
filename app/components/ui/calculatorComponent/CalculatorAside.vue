<template>
  <aside class="calculator-aside">
    <div class="calculator-aside__overlay">
      <p class="calculator-aside__caption">Construction & Remodeling Services</p>
      <h2 class="calculator-aside__title">Калькулятор ремонтних робіт</h2>
      <p class="calculator-aside__text">
        Спочатку оберіть кількість кімнат, потім самі кімнати, далі види робіт,
        площу і в кінці отримайте готовий чек для заявки.
      </p>

      <ul class="calculator-aside__list">
        <li>Вибір кімнат під вашу кількість</li>
        <li>Послуги окремо по кожній кімнаті</li>
        <li>Фінальний чек перед заявкою</li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
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
