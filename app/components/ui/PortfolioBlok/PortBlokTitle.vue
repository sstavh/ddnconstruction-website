<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="['h3', $props.class]">
    <slot />
  </h3>
</template>

<style scoped>
.h3 {
  margin: 0 0 12px;
}
</style>