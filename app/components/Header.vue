
<script setup>
import Button from './ui/Button.vue';
import ButtonBlef from './ui/ButtonBlef.vue';


const menu = [
  { title: 'Sounds', link: '/' },
  { title: 'Skills', link: '/' },
  { title: 'Plugins', link: '/' },
  { title: 'Studio', link: '/' },
  { title: 'Community', link: '/' },
  { title: 'Blog', link: '/' },
  { title: 'Pricing', link: '/' }
]

</script>

<template>
  <header class="header">
    <div class="container">
        <div class="header-container">
            <div class="header-container__navigation">
                <ButtonBlef />


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
        <Button />
            </div>
        </div>
    </div>
  </header>
</template>


<style scoped>

</style>
