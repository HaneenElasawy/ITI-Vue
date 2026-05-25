<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const products = ref([
  {
    id: 1,
    name: "Cozy Sneakers",
    description: "High-quality sneakers that go with everything you wear. Built for ultimate comfort and minimalist style.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
    badge: "NEW",
    price: 120,
    discount: 20,
    stock: 10,
    tags: ["Fashion", "Casual", "Sport"]
  },
  {
    id: 2,
    name: "Running Shoes",
    description: "Ultra-lightweight running shoes with reactive cushioning to supercharge your daily miles.",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop",
    badge: "HOT",
    price: 90,
    discount: 10,
    stock: 5,
    tags: ["Sport", "Running"]
  },
  {
    id: 3,
    name: "Casual Boots",
    description: "Premium leather boots designed to offer rugged durability while maintaining a sleek, modern aesthetic.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop",
    badge: "SALE",
    price: 150,
    discount: 0,
    stock: 8,
    tags: ["Casual", "Winter"]
  },
  {
    id: 4,
    name: "Minimalist Slides",
    description: "Water-resistant, ergonomic slides perfect for post-workout recovery or a relaxed weekend look.",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600&auto=format&fit=crop",
    badge: "",
    price: 30,
    discount: 15,
    stock: 20,
    tags: ["Summer", "Casual"]
  }
])

const totalLiveStock = computed(() => {
  return products.value.reduce((total, item) => total + item.stock, 0)
})

const handleBuyProduct = (productId, qty = 1) => {
  const targetProduct = products.value.find(p => p.id === productId)
  if (targetProduct && targetProduct.stock >= qty) {
    targetProduct.stock -= qty
  }
}

onMounted(() => {
  console.log("App.vue mounted")
})

onUnmounted(() => {
  console.log("App.vue unmounted")
})
</script>

<template>
  <div class="min-h-screen bg-brand-bg text-brand-text font-sans antialiased">
    <NavBar :totalStock="totalLiveStock" />
    <main class="max-w-4xl mx-auto py-8 px-4">
      <RouterView :products="products" @buy="handleBuyProduct" />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>