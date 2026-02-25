<script setup lang="ts">
console.log("ButtonInformationTest component loaded");
</script>

<template>
   <button class="button-information-test">Натисни щоб дізнатися більше<br/>----->  </button>
</template>

<style scoped>
.button-information-test{
    width: 270px;
    height: 350px;
    padding: 20px;
    background-color: var(--color-praymeri-blue);
    color: var(--color-praymeri-light);
    font-size: 34px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: start;
    align-items: start;
    border-radius: 20px;
}
.button-information-test:hover{
    background-color: var(--color-praymeri-blueHover);
}
</style>