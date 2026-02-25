<script setup lang="ts">
console.log("good Button");

</script>

<template>
<button class="button">Button</button>
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