<script lang="ts" setup>
import { ref } from "vue";

type ActionButton = {
  label: string;
  target: string;
};

const opened = ref(false);

const buttons: ActionButton[] = [
  { label: "Kitchen",   target: "portfolio-kitchen" },
  { label: "Bathroom",  target: "portfolio-bathroom" },
  { label: "Tiles",     target: "portfolio-tiles" },
  { label: "Painting",  target: "portfolio-painting" },
  { label: "Electrical",target: "portfolio-electric" },
  { label: "Plumbing",  target: "portfolio-plumbing" },
  { label: "Відео",     target: "portfolio-video" },
];

function toggle() {
  opened.value = !opened.value;
}

function scrollTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <section class="section">
    <div class="container-button">
      <header class="head">
        <h3 data-aos="fade-up" class="title">Choose the type of project</h3>
        <p class="subtitle">Browse project by category</p>
      </header>

      <div class="menu" :class="{ open: opened }">
        <!-- Main -->
        <button
          class="btn btn--main"
          @click="toggle"
          type="button"
          :aria-expanded="opened"
          aria-controls="actions"
        >
          <span class="btn__dot" aria-hidden="true"></span>
          {{ opened ? "Закрити" : "Меню" }}
          <span class="chev" aria-hidden="true">⌄</span>
        </button>

        <!-- Actions -->
        <div id="actions" class="actions" role="group" aria-label="Дії">
          <button
            v-for="(b, i) in buttons"
            :key="b.target"
            class="btn btn--sub"
            :class="[opened ? 'show' : '', i % 2 === 0 ? 'from-top' : 'from-bottom']"
            :style="{ transitionDelay: opened ? `${i * 80}ms` : '0ms' }"
            type="button"
            @click="scrollTo(b.target)"
          >
            {{ b.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Локальні токени (можеш підв’язати до своїх CSS vars) */
.section{
  padding: 64px 0;
}

.container-button{
  max-width: 1550px;
  margin: 0 auto;
  padding: 0 20px;
}

.head{
  text-align: center;
  margin-bottom: 18px;
}

.title{
  margin: 0 0 8px;
}

.subtitle{
  margin: 0;
  opacity: .8;
  color: var(--color-praymeri-light);
}

/* Скляна панель */
.menu{
  margin: 22px auto 0;
  width: fit-content;
  border-radius: 18px;
  padding: 14px;
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .10);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Ряд: main + список дій */
.actions{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: 12px;
  vertical-align: middle;
}

/* Базова кнопка */
.btn{
  width: 140px;
  appearance: none;
  border: 0;
  cursor: pointer;
  user-select: none;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: var(--padding-size-basis);
  border-radius: 14px;



  color: var(--color-praymeri-light);
  transition:
    transform .18s ease,
    box-shadow .18s ease,
    background .18s ease,
    opacity .25s ease;
}

/* Фокус для клавіатури */
.btn:focus-visible{
  outline: 2px solid rgba(99, 102, 241, .9);
  outline-offset: 3px;
}

/* Main button: градієнт + “живий” hover */
.btn--main{
  background-color: var(--color-praymeri-blue);

  padding-right: 16px;
  transition: 1s all ease;
}

.btn--main:hover{
  background-color: var( --color-praymeri-blueHover);
  transform: translateY(-1px);  
}

/* маленька крапка-індикатор */
.btn__dot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.75);
  box-shadow: 0 0 0 3px rgba(255,255,255,.12);
}

.chev{
  opacity: .9;
  transition: transform .22s ease;
  margin-left: 2px;
}

.menu.open .chev{
  transform: rotate(180deg);
}

/* Sub buttons */
.btn--sub{
background-color: var(--color-praymeri-blue);
  box-shadow: 0 10px 14px rgba(0,0,0,.18);
  transition: 1s all ease;
}

.btn--sub:hover{
  transform: translateY(-1px);
  background: var(--color-praymeri-blueHover);
}

/* hide by default */
.btn--sub{
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px) scale(.98);
}

/* стартові позиції для анімації */
.from-top{ transform: translateY(-12px) scale(.98); }
.from-bottom{ transform: translateY(12px) scale(.98); }

/* show */
.btn--sub.show{
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

/* менше руху для тих, хто просить */
@media (prefers-reduced-motion: reduce){
  .btn, .chev{ transition: none !important; }
}

/* Адаптив: на вузьких екранах — перенос і нормальні відступи */
@media (max-width: 820px){
  .menu{
    width: 100%;
    max-width: 680px;
  }
  .actions{
    margin-left: 0;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>