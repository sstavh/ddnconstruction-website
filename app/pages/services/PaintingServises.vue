<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const paintingCards = [
  { logo: "/logo.png", title: "Construction Quality", description: "We use proven materials and follow all technological standards.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827", section: "infoBlock1" },
  { logo: "/logo.png", title: "Clear Deadlines", description: "We work according to an agreed schedule and complete projects on time.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827", section: "infoBlock2" },
  { logo: "/logo.png", title: "Transparent Pricing", description: "No hidden fees — you know the project budget from the start.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827", section: "infoBlock3" },
  { logo: "/logo.png", title: "Experienced Team", description: "Our specialists have practical experience with projects of various levels of complexity.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827", section: "infoBlock4" },
  { logo: "/logo.png", title: "Work Guarantee", description: "We are confident in the quality of our work and provide a warranty on all completed services.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827", section: "infoBlock5" },
  { logo: "/logo.png", title: "Personalized Approach", description: "We select solutions based on your needs and budget.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827", section: "infoBlock6" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'paintingBefore1', rightSection: 'paintingAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'paintingBefore2', rightSection: 'paintingAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'paintingBefore3', rightSection: 'paintingAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Spackling / Painting"
    buttonText="Contact"
    buttonLink="/catalog"
    section="painting"
  />

  <InformationCards :cards="paintingCards"/>

  <TextTeclolojig
    title="Our technologies"
    text="We prepare and finish walls to a flawless standard, combining professional spackling with expert interior and exterior painting. Every surface is carefully assessed, repaired, and primed before any paint is applied, ensuring a smooth and lasting result.<br/><br/>Our team uses premium paints and proven techniques to achieve consistent coverage, clean edges, and a refined finish that holds up over time. We pay close attention to every corner and transition, so the final result looks polished from every angle.<br/><br/>Whether you need a single room refreshed or a full property repainted, we bring the same level of dedication to every job — delivering clean, beautiful walls that transform the feel of any space."
    buttonText="View Portfolio"
    buttonLink="/portfilio"
  />

  <BeforAfterSecContainer
    title="Before & After — Spackling / Painting"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
