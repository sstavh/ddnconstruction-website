<script lang="ts" setup>
const props = withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Button'
})
</script>
<template>
<div class="buttonBlef">
    <p>{{ props.text }}</p>
</div>
</template>
<style scoped>
.buttonBlef {
padding: 10px 15px;
border: 1px solid #000;
background-color: var(--color-praymeri-blue);
display: block;
max-width: 182px;
color: white;
font-weight: 600;
font-size: 13px;
border-radius: 8px;
}
</style>