<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

onMounted(() => {
  console.log("App.vue mounted")
})

onUnmounted(() => {
  console.log("App.vue unmounted")
})
</script>

<template>
  <div class="min-h-screen bg-brand-bg text-brand-text font-sans antialiased flex flex-col justify-between">
    <div>
      <NavBar />
      <main class="max-w-4xl mx-auto py-8 px-4">
        <RouterView />
      </main>
    </div>

    <footer class="bg-brand-text text-brand-card border-t border-gray-800 text-xs tracking-wider uppercase">
      <div class="max-w-4xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 class="font-bold mb-3">Zara Studio</h3>
          <p class="text-gray-400 text-[10px] leading-relaxed normal-case">
            A concept application exploring advanced component state, dynamic lifecycles, and relational property cascading in Vue 3.
          </p>
        </div>
        <div>
          <h3 class="font-bold mb-3">Links</h3>
          <ul class="space-y-2 text-[10px]">
            <li><RouterLink to="/" class="hover:text-gray-400 transition-colors">Home Collection</RouterLink></li>
            <li><RouterLink to="/cart" class="hover:text-gray-400 transition-colors">Your Bag</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-gray-400 transition-colors">About Studio</RouterLink></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-3">Developer</h3>
          <p class="text-gray-400 text-[10px] tracking-tight">
            Haneen Ahmed Hamdy [Nino]
          </p>
        </div>
      </div>
      <div class="border-t border-gray-900 py-4 text-center text-[9px] text-gray-500 font-mono">
        &copy; 2026 Zara Studio. All Rights Reserved. ITI Lab Assignment.
      </div>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>