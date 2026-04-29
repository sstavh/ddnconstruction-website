<template>
  <section class="about-video">
    <div class="container">

      <div class="about-video__content">

        <h3 class="about-video__title">
          Ми створюємо ремонт, у якому хочеться жити
        </h3>

        <p>
          Наша команда виконує ремонт квартир, будинків та комерційних приміщень.
          Ми працюємо акуратно, дотримуємось термінів та створюємо простір,
          який виглядає сучасно, дорого і комфортно.
        </p>
      </div>

      <div class="about-video__media">
        <video
          :key="videoSrc"
          controls
          autoplay
          muted
          loop
          playsinline
          poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400"
        >
          <source :src="videoSrc" type="video/mp4" />
        </video>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { imgUrl } from '~/composables/useApi'

const apiUrl = useRuntimeConfig().public.apiUrl
const videoSrc = ref('https://www.w3schools.com/html/mov_bbb.mp4')

onMounted(async () => {
  try {
    const res = await fetch(`${apiUrl}/section-images/section/videoSection`)
    const data = await res.json()
    if (Array.isArray(data) && data[0]?.imageUrl) {
      videoSrc.value = imgUrl(data[0].imageUrl)
    }
  } catch {}
})
</script>

<style scoped>

.about-video__title {
  margin: 0 0 20px;

}
.about-video {
  padding: clamp(70px, 8vw, 120px) 0;
  background: var(--color-praymeri-bg);
}

.container {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* TEXT */

.about-video__content {
  max-width: 860px;
  text-align: center;
  margin-bottom: clamp(28px, 5vw, 50px);
}

.about-video__label {
  display: inline-flex;
  margin-bottom: 18px;
  padding: 10px 18px;
  border-radius: 999px;

  background: rgba(59,130,246,0.12);
  border: 1px solid rgba(59,130,246,0.22);

  color: var(--color-praymeri-blue);
  font-family: var(--font-f-Inter);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.about-video__content h2 {
  margin: 0 0 20px;
  color: var(--color-praymeri-light);
  font-family: var(--font-f-Rudik);
  font-size: clamp(34px, 5vw, 62px);
  font-weight: 600;
  line-height: 1.05;
}

.about-video__content p {
  margin: 0 auto;
  max-width: 720px;

  color: rgba(255,255,255,0.72);
  font-family: var(--font-f-Inter);
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.75;
}

/* VIDEO */

.about-video__media {
  width: 100%;
  max-width: 1080px;
  overflow: hidden;
  border-radius: 34px;

  border: 1px solid rgba(255,255,255,0.08);

  box-shadow:
    0 30px 80px rgba(0,0,0,0.35);
}

.about-video__media video {
  display: block;
  width: 100%;
  height: clamp(280px, 55vw, 680px);
  object-fit: cover;
}

/* TABLET */

@media (max-width: 768px) {
  .about-video {
    padding: 60px 0;
  }

  .about-video__content h2 {
    font-size: 38px;
  }

  .about-video__media {
    border-radius: 24px;
  }

  .about-video__media video {
    height: 360px;
  }
}

/* MOBILE */

@media (max-width: 430px) {
  .container {
    padding: 0 12px;
  }

  .about-video__content h2 {
    font-size: 30px;
  }

  .about-video__content p {
    font-size: 15px;
  }

  .about-video__label {
    font-size: 12px;
    padding: 8px 14px;
  }

  .about-video__media {
    border-radius: 18px;
  }

  .about-video__media video {
    height: 250px;
  }
}
</style>