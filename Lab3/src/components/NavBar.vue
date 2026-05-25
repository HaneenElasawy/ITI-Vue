<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  console.log("NavBar.vue mounted")
})

onUnmounted(() => {
  console.log("NavBar.vue unmounted")
})
</script>

<template>
  <nav class="bg-brand-text border-b border-gray-800 sticky top-0 z-50 px-6 py-4 flex justify-between items-center text-brand-card">
    <span class="text-xs tracking-widest font-bold uppercase">Zara Studio</span>
    <div class="flex items-center gap-6 text-xs uppercase tracking-wider font-medium">
      <RouterLink to="/" class="text-brand-card hover:text-gray-300 transition-colors" active-class="font-bold border-b border-brand-card pb-1">Home</RouterLink>
      <RouterLink to="/cart" class="text-brand-card hover:text-gray-300 transition-colors" active-class="font-bold border-b border-brand-card pb-1">Bag ({{ cartStore.totalItems }})</RouterLink>
      <RouterLink to="/about" class="text-brand-card hover:text-gray-300 transition-colors" active-class="font-bold border-b border-brand-card pb-1">About</RouterLink>
      <div class="bg-gray-900 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-tight text-brand-card border border-gray-800">
        👜 Items: {{ cartStore.totalItems }}
      </div>
    </div>
  </nav>
</template>