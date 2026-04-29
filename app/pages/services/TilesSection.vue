<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';
import PromoCard from '../../components/ui/ServisesComponents/PromoCard.vue';
import BeforeAfter from '../../components/ui/informationBlok/beforeAfter.vue';
import TextBlok from '../../components/ui/informationBlok/TextBlok.vue';
import { ref, onMounted } from 'vue';
import { imgUrl, fetchSection } from '~/composables/useApi';

// ─── InformationCards per service ─────────────────────────────────────────────
const kitchenCards = [
  { logo: "/logo.png", title: "Design Planning", description: "Custom kitchen layout design tailored to your space and lifestyle.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Cabinet Installation", description: "Premium cabinets installed with precision and care.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Countertops", description: "Stone, quartz, and laminate countertop options to fit your budget.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Appliance Integration", description: "Seamless integration of appliances into your new kitchen layout.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Lighting & Electrical", description: "Under-cabinet lighting, pendants, and full electrical work.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827" },
  { logo: "/logo.png", title: "Final Finishing", description: "Backsplash, trim, and final touches that complete your kitchen.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827" },
];

// ─── Before/After blocks (3) ────────────────────────────────────────────────
const beforeAfterBlocks1 = [
  { leftColor: '#22c55e', rightColor: '#3b82f6' },
  { leftColor: '#f97316', rightColor: '#6366f1' },
  { leftColor: '#10b981', rightColor: '#ef4444' },
];



// ─── CollectedServises-like blocks (6 services) ────────────────────────────
const serviceBlocks = [
  {
    title: "Kitchen Service",
    link: "/services/KitchenServise",
    text: "Complete kitchen remodeling from design to final installation.",
    section: "kitchen",
  },
  {
    title: "Bathroom",
    link: "/services/bathroom",
    text: "Modern bathroom renovations with premium tile and fixture work.",
    section: "bathroom",
  },
  {
    title: "Tiles",
    link: "/services/tiles",
    text: "Expert tile installation for floors, walls, and backsplashes.",
    section: "tiles",
  },
  {
    title: "Spackling / Painting",
    link: "/services/painting",
    text: "Smooth wall preparation and professional interior/exterior painting.",
    section: "painting",
  },
  {
    title: "Electrical Work",
    link: "/services/electric",
    text: "Safe, code-compliant electrical installation and upgrades.",
    section: "electric",
  },
  {
    title: "Plumbing",
    link: "/services/plumbing",
    text: "Reliable plumbing for kitchens, bathrooms, and full-home systems.",
    section: "plumbing",
  },
];

// ─── Service block images ───────────────────────────────────────────────────
const serviceImgs = ref<Record<string, string[]>>({});

onMounted(async () => {
  for (const block of serviceBlocks) {
    try {
      const data = await fetchSection(block.section);
      if (Array.isArray(data)) {
        serviceImgs.value[block.section] = data.map((item: any) => imgUrl(item.imageUrl));
      }
    } catch (e) {}
  }
});

function getImg(section: string, index: number): string {
  return serviceImgs.value[section]?.[index] || '';
}
</script>

<template>
  <!-- ── Hero ─────────────────────────────────────────────────────────────── -->
  <HeroSECComponent
    title="Kitchen Service"
    buttonText="Переглянути каталог"
    buttonLink="/catalog"
    section="kitchen"
  />

  <!-- ── Information Cards ─────────────────────────────────────────────────── -->
  <InformationCards :cards="kitchenCards"/>

  <!-- ── Technology text ──────────────────────────────────────────────────── -->
  <TextTeclolojig
    title="Наші технології"
    text="Ми використовуємо сучасні матеріали та обладнання для забезпечення найвищої якості кожного проекту. Від планування до фінального результату — кожен крок продуманий."
  />

  <!-- ── Before/After #1 ──────────────────────────────────────────────────── -->
  <BeforAfterSecContainer
    title="Before & After — Кухні"
    :items="beforeAfterBlocks1"
  />




  <!-- ── Portfolio Section ─────────────────────────────────────────────────── -->
  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}

/* Services Overview */
.services-overview {
  margin-top: 80px;
}

.services-overview__title {
  text-align: center;
  margin-bottom: 60px;
  font-size: 32px;
}

.service-block {
  margin-bottom: 80px;
}

.service-block__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid var(--color-praymeri-blue, #3b82f6);
}

.service-block__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.before-after-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.before-after-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-praymeri-blekText, #555);
}

.ba-card {
  width: 530px;
  height: 400px;
}

.service-text-blok {
  width: 370px;
  height: 370px;
}

@media (max-width: 1024px) {
  .service-block__grid > * {
    width: 100% !important;
  }
  .ba-card {
    width: 100%;
  }
  .service-text-blok {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .services-overview__title {
    font-size: 24px;
  }
  .service-block__title {
    font-size: 20px;
  }
}
</style>
