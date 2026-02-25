<template>
 
    <div class="inner">
      <p class="text">
        <span>© {{ year }} {{ companyName }}</span>
        <span class="sep">|</span>
        <NuxtLink class="link" :to="privacyTo">Privacy Policy</NuxtLink>
      </p>
    </div>
  
</template>

<script setup lang="ts">
type Props = {
  companyName?: string
  privacyTo?: string
  year?: number
}

const props = withDefaults(defineProps<Props>(), {
  companyName: "Назва компанії",
  privacyTo: "/privacy-policy",
  year: 2026,
})
</script>

<style scoped>


.inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 16px;
}

.text {
  margin: 0;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: #666;
}

.sep {
  color: #b5b5b5;
}

.link {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.link:hover {
  border-bottom-color: currentColor;
}
</style>