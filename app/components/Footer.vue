<script lang="ts" setup>
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
            <p class="tagline">
              Ремонт та оздоблення. <br />
              Працюємо швидко, акуратно і прозоро.
            </p>
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
            <div class="socialCard">
              <SocialMediaTest />
            </div>
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
/* Якщо у тебе вже є .container глобально — цей блок можеш прибрати */
.container {
  width: min(1160px, 100%);
  margin: 0 auto;
  padding: 0 16px;
}

/* Фон футера */
.footer {
  padding: 56px 0;
  background:
    radial-gradient(1200px 600px at 20% 0%, rgba(255,255,255,0.10), transparent 60%),
    radial-gradient(1000px 600px at 90% 40%, rgba(255,255,255,0.08), transparent 55%),
    linear-gradient(135deg, rgb(24, 29, 120), rgb(18, 22, 80));
}

/* “Скляна” картка */
.footer-card {
  backdrop-filter: blur(10px);
}

/* Верх */
.top {
  display: grid;
  gap: 28px;
  align-items: start;
}

@media (min-width: 900px) {
  .top {
    grid-template-columns: 1.25fr 1fr 1fr;
    gap: 22px;
  }
}

/* Бренд */
.brand {
  display: grid;
  gap: 12px;
}

.tagline {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
}

/* Колонки */
.navBox,
.socialBox {
  display: grid;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 16px;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);
}

/* Навігація */
.nav {
  display: grid;
  gap: 10px;
}

@media (min-width: 520px) {
  .nav {
    gap: 10px;
  }
}

.nav-link {
  position: relative;
  width: fit-content;
  text-decoration: none;
  color: rgba(220, 235, 255, 0.9);
  transition: transform 0.15s ease, color 0.15s ease, opacity 0.15s ease;
  padding: 2px 0;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--color-praymeri-blueHover);
  border-radius: 999px;
  transition: transform 0.18s ease;
}

.nav-link:hover {
  color: var(--color-praymeri-light);
  transform: translateY(-1px);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

/* Соцблок — акуратна плашка */
.socialCard {
 
}

/* Divider */
.divider {
  height: 1px;
  margin: 18px 0 14px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.25),
    transparent
  );
}

/* Низ */
.bottom {
  justify-content: start;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

/* Якщо FooterCopyright має внутрішній клас .inner */
.bottom :deep(.inner) {
  padding: 0;
}

/* Трохи “дрібної” типографіки всередині */
.bottom :deep(*) {
  color: rgba(255, 255, 255, 0.78);
}
</style>