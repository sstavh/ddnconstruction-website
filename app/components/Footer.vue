<script lang="ts" setup>
console.log("Footer good Work");
import ButtonBlef from "./ui/ButtonBlef.vue";
import SocialMediaTest from "./ui/footerComponents/SocialMediaTest.vue";
import FooterCopyright from "./ui/footerComponents/FooterCopyright.vue";

const menu = [
  { title: "Про нас", link: "/" },
  { title: "Портфоліо", link: "/" },
  { title: "Каркулятор", link: "/" },
  { title: "Послуги", link: "/" },
  { title: "Прайс", link: "/" },
];
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-card">
        <div class="top">
          <div class="brand">
            <ButtonBlef />
            <p class="tagline">Ремонт та оздоблення. <br/>Працюємо швидко, акуратно і прозоро.</p>
          </div>

          <div class="navBox" aria-label="Навігація футера">
            <h4 class="title">Меню</h4>
            <nav class="nav">
              <NuxtLink
                v-for="(item, i) in menu"
                :key="i"
                :to="item.link"
                class="nav-link"
              >
                {{ item.title }}
              </NuxtLink>
            </nav>
          </div>

          <div class="socialBox" aria-label="Соцмережі">
            <h4 class="title">Ми на звʼязку</h4>
            <SocialMediaTest />
          </div>
        </div>

        <div class="divider" />

        <div class="bottom">
          <FooterCopyright companyName="My Company" privacyTo="/privacy" />
          
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Якщо в проєкті вже є .container — можеш видалити цей блок */


.footer {
    background: rgb(30, 32, 144);
    padding: 40px 0;
}


.top {
    display: grid;
    gap: 32px;  
}

/* 3 колонки на десктопі */
@media (min-width: 900px) {
  .top {
    grid-template-columns: 1.2fr 1fr 1fr;
    align-items: start;
    gap: 22px;
  }
}

.brand {
  gap: 10px;
  color: var(--color-praymeri-light);
}

.tagline {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-praymeri-light);
}

.navBox,
.socialBox {
  
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 18px;
  color: var(--color-praymeri-light);
}

.nav {
    display: flex;
    flex-direction: column;
    gap: 8px;

}

@media (min-width: 520px) {
  .nav {
    
    gap: 10px 14px;
  }
}

.nav-link {
  text-decoration: none;
  color: var(--color-praymeri-blue);
  font-size: 18px;
  transition: transform 0.12s ease, border-color 0.12s ease;
}

.nav-link:hover {
color: var(--color-praymeri-blueHover);
  transform: translateY(-1px);
}

.divider {
  height: 1px;
  background: #ededed;
  margin: 16px 0;
}

.bottom :deep(.inner) {
  padding: 0;
}
</style>