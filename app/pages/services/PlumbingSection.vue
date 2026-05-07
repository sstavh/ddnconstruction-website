<script setup lang="ts">
import HeroSECComponent from '../../components/base/DetalsServises/HeroSECComponent.vue';
import PortofolioSec from '../../components/base/HiroPages/PortofolioSec.vue';
import BeforAfterSecContainer from '../../components/ui/DetalsServisesComponents/beforAfterSecContainer.vue';
import InformationCards from '../../components/ui/DetalsServisesComponents/Information-Cards.vue';
import TextTeclolojig from '../../components/ui/DetalsServisesComponents/textTeclolojig.vue';

const plumbingCards = [
  { logo: "/logo.png", title: "Construction Quality", description: "We use proven materials and follow all technological standards.", colors: ['#3b82f6', '#8b5cf6', '#22c55e'], blockColor: "#111827", section: "infoBlock1" },
  { logo: "/logo.png", title: "Clear Deadlines", description: "We work according to an agreed schedule and complete projects on time.", colors: ['#f97316', '#eab308', '#22c55e'], blockColor: "#111827", section: "infoBlock2" },
  { logo: "/logo.png", title: "Transparent Pricing", description: "No hidden fees — you know the project budget from the start.", colors: ['#06b6d4', '#3b82f6', '#8b5cf6'], blockColor: "#111827", section: "infoBlock3" },
  { logo: "/logo.png", title: "Experienced Team", description: "Our specialists have practical experience with projects of various levels of complexity.", colors: ['#ec4899', '#f97316', '#eab308'], blockColor: "#111827", section: "infoBlock4" },
  { logo: "/logo.png", title: "Work Guarantee", description: "We are confident in the quality of our work and provide a warranty on all completed services.", colors: ['#10b981', '#06b6d4', '#3b82f6'], blockColor: "#111827", section: "infoBlock5" },
  { logo: "/logo.png", title: "Personalized Approach", description: "We select solutions based on your needs and budget.", colors: ['#8b5cf6', '#ec4899', '#f97316'], blockColor: "#111827", section: "infoBlock6" },
];

const beforeAfterBlocks = [
  { leftColor: '#22c55e', rightColor: '#3b82f6', leftSection: 'plumbingBefore1', rightSection: 'plumbingAfter1' },
  { leftColor: '#f97316', rightColor: '#6366f1', leftSection: 'plumbingBefore2', rightSection: 'plumbingAfter2' },
  { leftColor: '#10b981', rightColor: '#ef4444', leftSection: 'plumbingBefore3', rightSection: 'plumbingAfter3' },
];
</script>

<template>
  <HeroSECComponent
    title="Plumbing"
    buttonText="Contact"
    buttonLink="/catalog"
    section="plumbing"
  />

  <InformationCards :cards="plumbingCards"/>

  <TextTeclolojig
    title="Our technologies"
    text="We provide reliable plumbing services for kitchens, bathrooms, and full-home systems, handling everything from pipe installation and fixture replacement to complex rerouting and water supply upgrades. Our team works cleanly and efficiently, minimizing disruption to your daily routine.<br/><br/>Every plumbing project starts with a thorough assessment to identify the best solution for your space and budget. We use durable, tested materials and apply proven techniques to ensure leak-free connections and long-term system performance.<br/><br/>From straightforward repairs to complete plumbing installations, we bring the same level of professionalism to every job — delivering dependable results that keep your home running smoothly for years to come."
    buttonText="View Portfolio"
    buttonLink="/portfilio"
  />

  <BeforAfterSecContainer
    title="Before & After — Plumbing"
    :items="beforeAfterBlocks"
  />

  <PortofolioSec class="tt"/>
</template>

<style scoped>
.tt {
  margin-bottom: 70px;
}
</style>
