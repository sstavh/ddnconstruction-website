<script lang="ts" setup>
console.log("Footer good Work");
import ButtonBlef from './ui/ButtonBlef.vue'
import SocialMediaTest from './ui/footerComponents/SocialMediaTest.vue';
import FooterCopyright from './ui/footerComponents/FooterCopyright.vue';
const menu = [
  { title: 'Про нас', link: '/' },
  { title: 'Портфоліо', link: '/' },
  { title: 'Каркулятор', link: '/' },
  { title: 'Послуги', link: '/' },
  { title: 'Прайс', link: '/' },
]
</script>

<template>
    <footer>
        <div class="container">
            <div class="footer-container">
                <div class="footer-container__box">
                    <ButtonBlef />

                    <div class="footer-box__navigation">
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
                    <div class="footer-box__social">
                        <SocialMediaTest />
                    </div>
                </div>
                <FooterCopyright companyName="My Company" privacyTo="/privacy" />
            </div>
        </div>
    </footer>
</template>
<style scoped>
</style>