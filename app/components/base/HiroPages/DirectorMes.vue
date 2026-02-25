<script setup lang="ts">
import Button from '../../ui/Button.vue';

console.log("director mes work");
</script>

<template>
<section>
    <div class="container">
        <div class="directorMes-container">
             <h3 class="directorMes-box__logo">Слова Директора</h3>
            <div class="directorMes-box">
               <div data-aos="fade-up-right">
                <div data-aos="zoom-out-right" class="img-cont">IMGS</div>
               </div>
                
                <div class="directorMes-box__container">
                    <p class="directorMes-box__text">Тут може бути текст, який буде відображатися у розділі "Слова Директора".</p>
                    <Button />
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
.directorMes-container{
    padding-top: 180px;
    padding-bottom: 30px;
}

.directorMes-box{
    display: flex;
    gap: 30px;
    margin: 0 auto;
    align-items: center;
}

.directorMes-box__logo{
    text-align: center;
    margin-bottom: 55px;
}

.img-cont{
    height: 500px;
    width: 430px;
    background-color: red;
    margin-right: 55px;
}

.directorMes-box__text{
    padding-bottom: 25px;
}
</style>