<script setup lang="ts">
console.log("Information good work");
import FotoImgTest from '~/components/ui/informationBlok/FotoImgTest.vue';
import FotosPortaolio from '~/components/ui/FotosPortaolio.vue';
import ButtonInformationTest from '~/components/ui/informationBlok/ButtonInformationTest.vue';
</script>

<template>
    <div class="container">
        <div class="info-container">
            <div class="info-container__box">
                <ul class="info-box__ul">
                    <li>
                        <FotoImgTest/>
                    </li>
                    <li>
                        <FotosPortaolio class="update"/>
                    </li>
                    <li>    
                        <ButtonInformationTest/>    
                    </li>

                    <li>

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

.update{
    width: 470px;
    height: 350px;
}
</style>