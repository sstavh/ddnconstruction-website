<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
    <div class="text-container">
        <p :class="['p', $props.class]">
    <slot />
  </p>
    </div>
</template>

<style scoped>
.text-container{
    padding: 40px;
    background: var(--color-secondary-grau);
    border-radius: 15px;
    width: 320px;
    height: 450px;
}
</style>