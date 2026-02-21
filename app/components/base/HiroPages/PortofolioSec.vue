<script lang="ts setup"></script>

<template>
    <section>
        <div class="container">
            <div class="portfiliosec-container">
                <div class="portfoliosec-container__box">
                    <h2 class="portfoliosec-box__logo">Портфоліо</h2>
                    <div class="box-galeri">
                        <ul class="box-galeri__list">
                            <li><div style="padding: 40px; display: grid; place-items: start;">
    <CyclingHoverCard
      text="Текст з’являється на hover або рандомно на 6с"
      :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
      :cycle-seconds="25"
      :random-min-wait-seconds="2"
      :random-max-wait-seconds="5"
      :random-show-seconds="40"
    />
  </div></li>
                        </ul>
                        <ul>
                        <li><div style="padding: 40px; display: grid; place-items: start;">
         <CyclingHoverCard
      text="Текст з’являється на hover або рандомно на 6с"
      :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
      :cycle-seconds="25"
      :random-min-wait-seconds="5"
      :random-max-wait-seconds="10"
      :random-show-seconds="15"
    />
  </div></li>
                        </ul>
                        <ul>
                            <li><div style="padding: 40px; display: grid; place-items: start;">
    <CyclingHoverCard
      text="Текст з’являється на hover або рандомно на 6с"
      :colors="['#ff4d4d', '#7c3aed', '#22c55e']"
      :cycle-seconds="25"
      :random-min-wait-seconds="5"
      :random-max-wait-seconds="7"
      :random-show-seconds="8"
    />
  </div></li>
                        </ul>
                        <div class="box-galeri__button">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<style scoped>
.portfoliosec-box__logo{
text-align: center;
color: var(--color-praymeri-blek);
font-size: var( --font-s-title);
}

.box-galeri{
    display: flex;  
}


</style>