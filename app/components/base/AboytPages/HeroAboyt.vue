<script lang="ts" setup>
</script>

<template>
    <section class="heroAbaut-section">
        <div class="container">
            <div class="heroAbaut-container">
                <div class="heroAbout-container-box">
                    <h1 class="heroAbout-box__title">
                        <span class="title-text">Про нас</span>
                    </h1>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.heroAbaut-section{
    margin-top: -60px;
    height: 470px;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0)
    ),
    blueviolet;
}

.heroAbout-box__title{
    padding-top: 14%;
    text-align: center;
    width: 100%;
    display: inline-block;
    border-bottom: 2px solid var(--color-secondary-steel);
    padding-bottom: 40px;
}

/* Анімується тільки текст */
.title-text{
    display: inline-block;
    opacity: 0;
    animation: fadeUp 1s ease forwards;
}

@keyframes fadeUp{
    from{
        opacity: 0;
        transform: translateY(40px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}
</style>