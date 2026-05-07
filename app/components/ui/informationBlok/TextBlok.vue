<script setup lang="ts">
interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Our company is focused on results and long-term quality. We do the job right the first time — so you don’t have to fix it later.'
})

console.log("TextBlok component loaded")
</script>

<template>
  <div class="textBlok-container">
    <p class="textBlok-container__text">
      &ldquo;<br />
      {{ props.text }}<br />
      &rdquo;
    </p>
  </div>
</template>

<style scoped>
.textBlok-container {
  width: 100%;
  height: 100%;
  min-height: 280px;
  padding: 20px;
  background-color: rgb(79, 64, 37);
  color: var(--color-praymeri-light);
  font-size: var(--font-s-button);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: start;
  align-items: start;
  border-radius: 20px;
  box-sizing: border-box;
}

.textBlok-container__text {
  margin: 0;
  line-height: 1.5;
}
</style>