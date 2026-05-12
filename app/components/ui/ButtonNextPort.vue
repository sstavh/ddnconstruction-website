<template>
    <div class="container">
        <NuxtLink to="/portfilio" class="button-next">
            <div>Click to see more!!!</div>
            <div class="tt">></div>
        </NuxtLink>
    </div>
</template>
<style scoped>
.button-next {
    margin-top: -30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 35px;
    background-color: #007BFF;
    color: var( --color-praymeri-light);
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.button-next:hover {
    background-color: #0068d6;
}

@media (max-width: 430px) {
  .button-next {
    margin-top: 0;
    padding: 16px 20px;
    font-size: var(--font-s-MobalSmoll);
  }
}
</style>
