<script setup lang="ts">
interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'текст який охарактеризовує інформаційний блок. Довгий текст, що відображається у інформаційному блоці.'
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
  width: 270px;
  height: 350px;
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
}

.textBlok-container__text {
  margin: 0;
  line-height: 1.5;
}
</style>