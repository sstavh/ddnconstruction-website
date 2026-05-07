<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const tilesCards = [
  { logo: "/logo.png", title: "Construction Quality", description: "We use proven materials and follow all technological standards.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827", section: "infoBlock1" },
  { logo: "/logo.png", title: "Clear Deadlines", description: "We work according to an agreed schedule and complete projects on time.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827", section: "infoBlock2" },
  { logo: "/logo.png", title: "Transparent Pricing", description: "No hidden fees — you know the project budget from the start.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827", section: "infoBlock3" },
  { logo: "/logo.png", title: "Experienced Team", description: "Our specialists have practical experience with projects of various levels of complexity.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827", section: "infoBlock4" },
  { logo: "/logo.png", title: "Work Guarantee", description: "We are confident in the quality of our work and provide a warranty on all completed services.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827", section: "infoBlock5" },
  { logo: "/logo.png", title: "Personalized Approach", description: "We select solutions based on your needs and budget.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827", section: "infoBlock6" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'tilesBefore1', rightSection: 'tilesAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'tilesBefore2', rightSection: 'tilesAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'tilesBefore3', rightSection: 'tilesAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Tile Installation"
    buttonText="Contact"
    buttonLink="/catalog"
    section="tiles"
  />

  <InformationCards :cards="tilesCards"/>

  <TextTeclolojig
    title="Our technologies"
    text="We provide professional tile installation for projects of any size and style, from small detailed tiles to large-format surfaces. Our team focuses on precision, proper alignment, and clean execution to ensure a flawless and consistent finish.<br/><br/>Using proven techniques and quality materials, we deliver strong, durable results that stand the test of time. Every step of the process is carefully managed to achieve both visual appeal and long-term performance.<br/><br/>Whether it’s floors, walls, or custom features, we tailor each installation to match the design and needs of the space, creating surfaces that are both functional and visually striking."
    buttonText="View Portfolio"
    buttonLink="/portfilio"
  />

  <BeforAfterSecContainer
    title="Before & After — Tile Installation"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
