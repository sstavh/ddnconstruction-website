<script setup lang="ts">
const props = defineProps<{
  link?: string
  text?: string
}>()
</script>

<template>
  <NuxtLink v-if="link" :to="link" class="button">
    {{ text || 'Contact' }}
  </NuxtLink>
  <button v-else class="button">
    {{ text || 'Contact' }}
  </button>
</template>

<style scoped>
.button {
    font-size: var( --font-s-button);
    border: 1px solid var(--color-praymeri-blue);
    background-color: var(--color-praymeri-blue);
    padding: var(--padding-size-basis);
    color: var( --color-praymeri-light);
    border-radius: 5px;
    transition: all 0.3s ease;
}
.button:hover {
    border: 1px solid var(--color-praymeri-blueHover);
    background-color: var(--color-praymeri-blueHover);
}

.button:active{
     transform: translateY(1.4px);
}
</style>