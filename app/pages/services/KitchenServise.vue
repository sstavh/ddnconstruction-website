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
  { logo: "/logo.png", title: "Construction Quality", description: "We use proven materials and follow all technological standards.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827", section: "infoBlock1" },
  { logo: "/logo.png", title: "Clear Deadlines", description: "We work according to an agreed schedule and complete projects on time.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827", section: "infoBlock2" },
  { logo: "/logo.png", title: "Transparent Pricing", description: "No hidden fees — you know the project budget from the start.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827", section: "infoBlock3" },
  { logo: "/logo.png", title: "Experienced Team", description: "Our specialists have practical experience with projects of various levels of complexity.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827", section: "infoBlock4" },
  { logo: "/logo.png", title: "Work Guarantee", description: "We are confident in the quality of our work and provide a warranty on all completed services.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827", section: "infoBlock5" },
  { logo: "/logo.png", title: "Personalized Approach", description: "We select solutions based on your needs and budget.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827", section: "infoBlock6" },
];

// ─── Before/After blocks (3) ────────────────────────────────────────────────
const beforeAfterBlocks1 = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'kitchenBefore1', rightSection: 'kitchenAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'kitchenBefore2', rightSection: 'kitchenAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'kitchenBefore3', rightSection: 'kitchenAfter3' },
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
    buttonText="Contact"
    buttonLink="/catalog"
    section="kitchen"
  />

  <!-- ── Information Cards ─────────────────────────────────────────────────── -->
  <InformationCards :cards="kitchenCards"/>

  <!-- ── Technology text ──────────────────────────────────────────────────── -->
  <TextTeclolojig
    title="Our technologies"
    text="Elevate your kitchen with cutting-edge installation techniques and time-tested craftsmanship that guarantee unparalleled quality and enduring performance. Our seasoned professionals blend decades of expertise with meticulous attention to every detail, ensuring flawless execution from concept to completion.<br/><br/>

Every phase of your project—from visionary design to exquisite finishing—is orchestrated with precision and passion, upholding the highest industry benchmarks. We prioritize seamless functionality, robust durability, and timeless aesthetics to craft culinary spaces that inspire both practicality and elegance.<br/><br/>

Embracing a diverse palette of premium materials and innovative layouts, we tailor each transformation to harmonize perfectly with your unique lifestyle and aspirations. Our unwavering commitment is to create a culinary haven that dazzles the senses and stands the test of time, delivering joy and reliability for generations."
    buttonText="View Portfolio"
    buttonLink="/portfilio"
  />

  <!-- ── Before/After #1 ──────────────────────────────────────────────────── -->
  <BeforAfterSecContainer
    title="Before & After — Kitchen Service"
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
