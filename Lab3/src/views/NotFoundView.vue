<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(() => {
  console.log("NotFoundView mounted")
})

onUnmounted(() => {
  console.log("NotFoundView unmounted")
})
</script>

<template>
  <div class="max-w-md mx-auto text-center py-16 px-4 bg-brand-card rounded-lg shadow-sm border border-gray-100 my-12">
    <h1 class="text-7xl font-mono font-bold tracking-tighter text-brand-text mb-4">404</h1>
    <h2 class="text-sm font-bold uppercase tracking-widest text-gray-800 mb-3">Page Not Found</h2>
    <p class="text-gray-500 text-xs leading-relaxed normal-case mb-8">
      The destination you are trying to reach does not exist or has been permanently moved out of our studio collection.
    </p>
    <RouterLink 
      to="/" 
      class="btn inline-block bg-brand-text text-brand-card rounded-none tracking-widest uppercase text-xs font-medium px-6 py-3 hover:bg-gray-900 transition-all"
    >
      Back to Collection
    </RouterLink>
  </div>
</template>