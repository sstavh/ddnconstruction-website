<script setup lang="ts">
import FotosPortaolio from '~/components/ui/FotosPortaolio.vue'
import ButtonNextPort from '~/components/ui/ButtonNextPort.vue'
</script>

<template>
  <section class="portfoliosec-container__box">
    <div class="container">

      <div class="portfiliosec-container">
        <div class="">

          <h3 class="portfoliosec-box__logo">
            Portfolio
          </h3>

          <div class="box-galeri">

            <ul class="box-galeri__list">

              <li class="box-galeri__item"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="0">
                <FotosPortaolio
                  text="Custom Home Construction"
                  :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
                  :cycle-seconds="25"
                  :random-min-wait-seconds="2"
                  :random-max-wait-seconds="5"
                  :random-show-seconds="40"
                />
              </li>

              <li class="box-galeri__item"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="400">
                <FotosPortaolio
                  text="Commercial Property Renovation"
                  :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
                  :cycle-seconds="25"
                  :random-min-wait-seconds="5"
                  :random-max-wait-seconds="10"
                  :random-show-seconds="15"
                />
              </li>

              <li class="box-galeri__item"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  data-aos-delay="800">
                <FotosPortaolio
                  text="Interior Renovation & Finishing"
                  :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
                  :cycle-seconds="25"
                  :random-min-wait-seconds="5"
                  :random-max-wait-seconds="7"
                  :random-show-seconds="8"
                />
              </li>

            </ul>

            <div class="box-galeri__button"
                 data-aos="fade-up"
                 data-aos-duration="1500"
                 data-aos-delay="1200">
              <ButtonNextPort class="tt" />
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>


/* SECTION WRAPPER */
.portfolio-section {
  margin: 120px 0;
}

/* MAIN BOX BACKGROUND */
.portfoliosec-container__box {
  position: relative;
  overflow: hidden;

  padding: 60px 20px;


  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 35%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
    var(--color-praymeri-bg);

  border: 1px solid rgba(59, 130, 246, 0.2);

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

/* glow overlay */
.portfoliosec-container__box::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;

  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.05),
    transparent 40%,
    rgba(124,58,237,0.08)
  );

  opacity: 0.6;
}

/* TITLE */
.portfoliosec-box__logo {
  position: relative;
  z-index: 1;

  text-align: center;
  color: var(--color-praymeri-light);

  font-size: 28px;
  font-weight: 700;

  margin-bottom: 32px;
}

/* GALLERY */
.box-galeri {
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* LIST */
.box-galeri__list {
  display: flex;
  justify-content: center;
  gap: 20px;

  padding: 0;
  margin-bottom: 45px;

  list-style: none;
}

/* ITEM */
.box-galeri__item {
  list-style: none;
  transition: transform 0.3s ease;
}

.box-galeri__item:hover {
  transform: translateY(-6px);
}

/* BUTTON */
.box-galeri__button {
  display: flex;
  justify-content: center;
}

/* ===================== */
/* ADAPTIVE */
/* ===================== */

@media (max-width: 1024px) {
.box-galeri__item:nth-child(n+3) {
    display: none;
  }

  .box-galeri__list {
    gap: 16px;
  }
}

/* 2 items */

/* 1 item */
@media (max-width: 430px) {
  .container {
    max-width: 360px;
  }

  .portfoliosec-container__box {
    padding: 40px 14px;
    border-radius: 20px;
  }

  .box-galeri__item:nth-child(n+2) {
    display: none;
  }

  .portfoliosec-box__logo {
    font-size: 22px;
  }
}
</style>