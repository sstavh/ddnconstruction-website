<script lang="ts" setup>
console.log("hero good woork");
</script>

<template>
    <section class="heroAbaut-section">
        <div class="container">
            <div class="heroAbaut-container">
                <div class="heroAbout-container-box">
                    <h1 class="heroAbout-box__title">Про  нас</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.heroAbaut-section{
    height: 400px;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0.4, 0.8),   /* темний низ */
        rgba(0, 0, 0, 0)      /* прозорий верх */
    ),
    blueviolet; /* основний колір */
}

.heroAbout-box__title{

}
</style>