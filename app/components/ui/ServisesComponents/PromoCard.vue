<template>
  <div class="promo-card" :style="cardStyle">

    <!-- базовий колір -->
    <div class="promo-card__color"></div>

    <!-- затемнення -->
    <div class="promo-card__overlay"></div>

    <div class="promo-card__content">
      <img class="promo-card__logo" :src="logo" alt="logo" />

      <NuxtLink :to="link" class="promo-card__button">
        {{ buttonText }}
        <span class="promo-card__arrow">→</span>
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Props {
  logo: string
  color?: string
  bgImage?: string
  width?: string
  height?: string
  link?: string
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: "#000000",
  width: "320px",
  height: "420px",
  link: "/",
  buttonText: "Перейти"
})

const cardStyle = computed(() => ({
  '--card-color': props.color,
  width: props.width,
  height: props.height,
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none'
}))
</script>

<style scoped>

.promo-card{
  position:relative;
  border-radius:24px;
  overflow:hidden;

  background-size:cover;
  background-position:center;

  transition: transform .35s ease, box-shadow .35s ease;
}

.promo-card:hover{
  transform:scale(1.03);
  box-shadow:0 20px 50px rgba(0,0,0,0.25);
}

/* базовий колір */
.promo-card__color{
  position:absolute;
  inset:0;
  background:var(--card-color);
  opacity:.6;
  z-index:1;
}

/* затемнення */
.promo-card__overlay{
  position:absolute;
  inset:0;

  background:linear-gradient(
    to top,
    rgba(0,0,0,.85) 0%,
    rgba(0,0,0,.55) 45%,
    rgba(0,0,0,.2) 75%,
    rgba(0,0,0,0) 100%
  );

  transition:opacity .35s ease;
  z-index:2;
}

.promo-card:hover .promo-card__overlay{
  opacity:0;
}

.promo-card__content{
  position:relative;
  z-index:3;

  height:100%;
  padding:28px;

  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  gap:20px;
}

.promo-card__logo{
  width:120px;
}

.promo-card__button{
  display:inline-flex;
  align-items:center;
  gap:10px;

  padding:14px 20px;
  border-radius:14px;

  background:rgba(255,255,255,.15);
  color:white;
  text-decoration:none;
  font-weight:600;

  backdrop-filter:blur(10px);
}

.promo-card__arrow{
  margin-left: auto;
  transition:transform .3s ease;
}

.promo-card:hover .promo-card__arrow{
  transform:translateX(6px);
}

</style>