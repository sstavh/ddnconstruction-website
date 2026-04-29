<template>
  <section class="portfolio-video">
    <div class="container">
      <div class="portfolio-video__head">

        <h3>Наші роботи у відео форматі</h3>
        <p>
          Натисніть на будь-яке відео, щоб переглянути роботу на весь екран.
        </p>
      </div>

      <div class="portfolio-video__grid">
        <button
          v-for="video in videos"
          :key="video.id"
          class="video-card"
          type="button"
          @click="openVideo(video)"
        >
          <video
            :src="video.src"
            :poster="video.poster"
            muted
            loop
            playsinline
            preload="metadata"
          ></video>

          <div class="video-card__content">
            <span>{{ video.category }}</span>
            <h3>{{ video.title }}</h3>
          </div>

          <div class="video-card__play">
            ▶
          </div>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="activeVideo"
          class="video-modal"
          @click.self="closeVideo"
        >
          <button class="video-modal__close" @click="closeVideo">
            ×
          </button>

          <div class="video-modal__box">
            <video
              :src="activeVideo.src"
              :poster="activeVideo.poster"
              controls
              autoplay
              playsinline
            ></video>
          </div>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

interface PortfolioVideo {
  id: number
  title: string
  category: string
  src: string
  poster: string
}

const activeVideo = ref<PortfolioVideo | null>(null)

const videos: PortfolioVideo[] = [
  {
    id: 1,
    title: 'Modern apartment renovation',
    category: 'Apartment',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200'
  },
  {
    id: 2,
    title: 'Luxury kitchen project',
    category: 'Kitchen',
    src: 'https://www.w3schools.com/html/movie.mp4',
    poster: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200'
  },
  {
    id: 3,
    title: 'Bathroom transformation',
    category: 'Bathroom',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200'
  }
]

const openVideo = (video: PortfolioVideo) => {
  activeVideo.value = video
  document.body.style.overflow = 'hidden'
}

const closeVideo = () => {
  activeVideo.value = null
  document.body.style.overflow = ''
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.portfolio-video {
  padding: clamp(70px, 8vw, 120px) 0;
  background: var(--color-praymeri-bg);
}

.container {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 0 16px;
}

.portfolio-video__head {
  max-width: 760px;
  margin: 0 auto clamp(34px, 5vw, 56px);
  text-align: center;
}

.portfolio-video__head span {
  display: inline-flex;
  margin-bottom: 16px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.24);
  color: var(--color-praymeri-blue);
  font-family: var(--font-f-Inter);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.portfolio-video__head h2 {
  margin: 0 0 18px;
  color: var(--color-praymeri-light);
  font-family: var(--font-f-Rudik);
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.08;
}

.portfolio-video__head p {
  margin: 0 auto;
  max-width: 620px;
  color: rgba(255,255,255,0.68);
  font-family: var(--font-f-Inter);
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.7;
}

.portfolio-video__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.video-card {
  position: relative;
  overflow: hidden;
  min-height: 430px;
  padding: 0;
  border: none;
  border-radius: 28px;
  background: var(--color-secondary-grau);
  cursor: pointer;
  text-align: left;
  box-shadow: 0 24px 60px rgba(0,0,0,0.28);
}

.video-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.78));
}

.video-card video {
  width: 100%;
  height: 100%;
  min-height: 430px;
  object-fit: cover;
  transform: scale(1.02);
  transition: 0.4s ease;
}

.video-card:hover video {
  transform: scale(1.08);
}

.video-card__content {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 22px;
  z-index: 3;
}

.video-card__content span {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.22);
  color: #fff;
  font-family: var(--font-f-Inter);
  font-size: 12px;
  font-weight: 700;
}

.video-card__content h3 {
  margin: 0;
  color: #fff;
  font-family: var(--font-f-Rudik);
  font-size: 24px;
  line-height: 1.15;
}

.video-card__play {
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 3;

  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: grid;
  place-items: center;

  background: rgba(255,255,255,0.14);
  color: #fff;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.16);

  font-size: 18px;
  transition: 0.25s ease;
}

.video-card:hover .video-card__play {
  background: var(--color-praymeri-blue);
  transform: scale(1.08);
}

/* FULLSCREEN MODAL */

.video-modal {
  position: fixed;
  inset: 0;
  z-index: 99999;
  padding: clamp(14px, 3vw, 34px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 5, 5, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.video-modal__close {
  position: fixed;
  top: clamp(16px, 3vw, 30px);
  right: clamp(16px, 3vw, 30px);
  z-index: 2;

  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.08);
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  transition: 0.25s ease;
}

.video-modal__close:hover {
  background: var(--color-praymeri-blue);
  transform: rotate(90deg);
}

.video-modal__box {
  width: min(1180px, 100%);
  max-height: 86vh;
  overflow: hidden;
  border-radius: clamp(18px, 3vw, 32px);
  background: #000;
  box-shadow: 0 30px 100px rgba(0,0,0,0.55);
}

.video-modal__box video {
  display: block;
  width: 100%;
  max-height: 86vh;
  object-fit: contain;
  background: #000;
}

/* ANIMATION */

.modal-enter-active,
.modal-leave-active {
  transition: 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .video-modal__box,
.modal-leave-to .video-modal__box {
  transform: scale(0.96);
}

/* ADAPTIVE */

@media (max-width: 980px) {
  .portfolio-video__grid {
    grid-template-columns: 1fr 1fr;
  }

  .video-card {
    min-height: 360px;
  }

  .video-card video {
    min-height: 360px;
  }
}

@media (max-width: 640px) {
  .portfolio-video {
    padding: 60px 0;
  }

  .portfolio-video__grid {
    grid-template-columns: 1fr;
  }

  .video-card {
    min-height: 320px;
    border-radius: 22px;
  }

  .video-card video {
    min-height: 320px;
  }

  .video-card__content h3 {
    font-size: 22px;
  }

  .video-modal {
    padding: 0;
  }

  .video-modal__box {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    display: flex;
    align-items: center;
  }

  .video-modal__box video {
    width: 100%;
    max-height: 100vh;
  }
}

@media (max-width: 430px) {
  .container {
    padding: 0 12px;
  }

  .portfolio-video__head h2 {
    font-size: 30px;
  }

  .portfolio-video__head p {
    font-size: 15px;
  }

  .video-card {
    min-height: 280px;
  }

  .video-card video {
    min-height: 280px;
  }

  .video-card__play {
    width: 48px;
    height: 48px;
  }
}
</style>