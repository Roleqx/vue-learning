<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <transition name="route" mode="out-in" type="transition">
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>

// loading components
import Header from '@/components/Header.vue'

export default {
  components: {
    appHeader: Header
  },
  data() {
    return {
      modalTrigger: false   
    }
  }
}
</script>

<style scoped>
.route-enter {
  opacity: 0;
  transform: translateY(10px);
}
.route-enter-active { 
  transition: all .15s;
}
.route-leave-active {
  transform: translateY(10px);
  opacity:0;
  transition: all .15s;
}
</style>
