<script setup lang="ts">
console.log("button Good Work");

</script>

<template>
    <div class="container">
        <button class="button-next">
            <div>Натискай щоб пореглянути більше!!!</div>
            <div class="tt">></div>
        
        </button>
    </div>
</template>
<style scoped>
.button-next {
    margin-top: -30px;
    width: 1170px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 35px;
    background-color: #007BFF;
    color: var( --color-praymeri-light);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px; 
    transition: all 0.3s ease;
} 

.button-next:hover {
    background-color: #0068d6;
}

@media (max-width: 1024px) {
   .button-next{
    width: 780px;
   }
  }
  
  @media (max-width: 768px) {
    .button-next{
    width: 650px;
   }
    
  }
   @media (max-width: 430px) {

    .button-next{
        margin:0 auto;
    width: 325px;
    font-size: var(--font-s-MobalSmoll);
   }

  }
</style>
