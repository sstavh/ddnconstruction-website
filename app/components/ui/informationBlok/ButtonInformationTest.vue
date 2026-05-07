<template>
   <NuxtLink to="/portfilio" class="button-information-test">Learn More &rarr; </NuxtLink>
</template>

<style scoped>
.button-information-test{
    display: flex;
    align-items: flex-start;
    width: 270px;
    height: 350px;
    padding: 20px;
    background-color: var(--color-praymeri-blue);
    color: var(--color-praymeri-light);
    font-size: 34px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
    border-radius: 20px;
}
.button-information-test:hover{
    background-color: var(--color-praymeri-blueHover);
}


</style>