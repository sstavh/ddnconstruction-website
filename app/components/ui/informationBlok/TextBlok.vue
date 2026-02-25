<script setup lang="ts">
console.log("TextBlok component loaded");
</script>

<template>
<div class="textBlok-container">
    <p class="textBlok-container__text">
        &ldquo;   </br>  текст який охарактеризовує інформаційний блок. Довгий текст, що відображається у інформаційному блоці. </br>   &rdquo;</p>
</div>
</template>

<style scoped>
.textBlok-container{
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
</style>