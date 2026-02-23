<script lang="ts" setup>
console.log("Cloud button");
</script>

<template>
  <button class="cloud-btn" type="button" aria-label="Всі відгуки">
    <svg class="cloud-svg" viewBox="0 0 520 120" aria-hidden="true">
      <!-- Зовнішній контур (stroke) -->
      <path
        class="cloud-stroke"
        d="M120 88
           C85 88, 60 70, 60 50
           C60 32, 78 18, 100 18
           C110 6, 130 0, 150 6
           C165 -2, 190 6, 198 22
           C210 12, 230 10, 245 18
           C258 6, 280 6, 292 18
           C310 8, 336 12, 350 28
           C370 18, 398 22, 410 40
           C440 40, 460 56, 460 74
           C460 96, 438 110, 410 110
           L150 110
           C135 110, 120 100, 120 88
           Z"
      />
      <!-- Заливка -->
      <path
        class="cloud-fill"
        d="M120 88
           C85 88, 60 70, 60 50
           C60 32, 78 18, 100 18
           C110 6, 130 0, 150 6
           C165 -2, 190 6, 198 22
           C210 12, 230 10, 245 18
           C258 6, 280 6, 292 18
           C310 8, 336 12, 350 28
           C370 18, 398 22, 410 40
           C440 40, 460 56, 460 74
           C460 96, 438 110, 410 110
           L150 110
           C135 110, 120 100, 120 88
           Z"
      />
    </svg>

    <span class="cloud-text">&rarr;</span>
  </button>
</template>

<style scoped>
.cloud-btn {
  position: relative;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;

  /* контроль розміру кнопки */
  width: 300px;
  height: 40px;

  transition: transform 0.2s ease;
}

.cloud-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cloud-fill {
  fill: #3b82f6;
}

.cloud-stroke {
  fill: none;
  stroke: #1e3a8a;      /* темніший контур */
  stroke-width: 6;
  stroke-linejoin: round;
}

.cloud-text {
  position: relative;
  z-index: 1;

  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;

  color: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.cloud-btn:hover {
  transform: translateY(-2px);
}

.cloud-btn:hover .cloud-fill {
  fill: #2563eb;
}

.cloud-btn:hover .cloud-stroke {
  stroke: #1d4ed8;
}
</style>