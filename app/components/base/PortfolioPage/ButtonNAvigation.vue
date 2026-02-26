<script lang="ts" setup>
import { ref } from "vue";

type BtnAction = "btn1" | "btn2" | "btn3" | "btn4" | "btn5" | "btn6";

type ActionButton = {
  label: string;
  action: BtnAction;
};

const opened = ref(false);

const buttons: ActionButton[] = [
  { label: "Кнопка 1", action: "btn1" },
  { label: "Кнопка 2", action: "btn2" },
  { label: "Кнопка 3", action: "btn3" },
  { label: "Кнопка 4", action: "btn4" },
  { label: "Кнопка 5", action: "btn5" },
  { label: "Кнопка 6", action: "btn6" },
];

function toggle() {
  opened.value = !opened.value;
}

function handleAction(action: BtnAction) {
  // тут прив’язуєш дії
  console.log("clicked:", action);
}
</script>

<template>
    <div class="container">
         <div class="btn-row">
    <!-- Активуюча кнопка теж у цьому ж ряду -->
    <button class="btn main" @click="toggle">
      {{ opened ? "Закрити" : "Меню" }}
    </button>

    <!-- 6 кнопок поруч в тій самій площині -->
    <button
      v-for="(b, i) in buttons"
      :key="b.action"
      class="btn sub"
      :class="[
        opened ? 'show' : '',
        i % 2 === 0 ? 'from-top' : 'from-bottom'
      ]"
      :style="{ transitionDelay: opened ? `${i * 120}ms` : '0ms' }"
      @click="handleAction(b.action)"
    >
      {{ b.label }}
    </button>
  </div>
    </div>
 
</template>

<style scoped>
/* 1 лінія / 1 площина для всіх кнопок */
.btn-row{
    margin-top: -70px;
margin-left: 40px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: nowrap; /* якщо хочеш ЗАВЖДИ 1 ряд */
}

.btn {
  color: var(--color-praymeri-light);
  font-size: var(--font-s-button);
  padding: var(--padding-size-basis);
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid var(--color-praymeri-blue);
  background: var(--color-praymeri-blue);
  transition: all 0.3s ease;
}

.btn:hover {
  border: 1px solid var(--color-praymeri-blueHover);
  background: var(--color-praymeri-blueHover);
}

/* початково приховані 6 кнопок */
.sub{
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* стартові позиції для анімації (вгору/вниз) */
.from-top{ transform: translateY(-22px); }
.from-bottom{ transform: translateY(22px); }

/* показ */
.sub.show{
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
</style>