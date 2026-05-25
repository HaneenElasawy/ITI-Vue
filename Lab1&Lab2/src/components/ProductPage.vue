<script setup>
import { ref, computed } from 'vue'

const cartCount = ref(0)

const product = ref({
  id: 1,
  name: "Cozy Sneakers",
  description: "High-quality sneakers that go with everything you wear. Built for ultimate comfort.",
  image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
  badge: "NEW",
  price: 120,
  discount: 20,
  tags: ["Fashion", "Casual", "Sport"],
  isAvailable: true,
  quantity: 1
})

const relatedProducts = ref([
  {
    id: 2,
    name: "Running Shoes",
    price: 90,
    discount: 10,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Casual Boots",
    price: 150,
    discount: 0,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Minimalist Slides",
    price: 30,
    discount: 15,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600&auto=format&fit=crop"
  }
])

const singleProductPrice = computed(() => {
  return product.value.price - product.value.discount
})

const subtotalPrice = computed(() => {
  return singleProductPrice.value * product.value.quantity
})

const increaseQty = () => {
  product.value.quantity++
}

const decreaseQty = () => {
  if (product.value.quantity > 1) {
    product.value.quantity--
  }
}

const addToCart = () => {
  if (product.value.isAvailable) {
    cartCount.value += product.value.quantity
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto bg-brand-card p-6 rounded-lg shadow-sm text-brand-text">
    
    <div class="flex justify-between items-center border-b pb-4 mb-6">
      <span class="text-xs tracking-widest font-bold uppercase">Zara Studio</span>
      <div class="flex items-center gap-2 bg-brand-bg px-3 py-1.5 rounded-full text-xs font-semibold">
        🛒 Bag: <span class="text-brand-text font-bold">{{ cartCount }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8 mb-8">
      <div class="flex justify-center items-center bg-brand-bg p-4 rounded-xl aspect-square">
        <img :src="product.image" :alt="product.name" class="rounded-lg shadow-sm max-w-full max-h-64 object-cover" />
      </div>

      <div class="flex flex-col justify-between">
        <div>
          <span v-if="product.badge" class="inline-block bg-brand-text text-brand-card text-xs px-2 py-1 font-bold uppercase tracking-wider mb-3">
            {{ product.badge }}
          </span>
          <h1 class="text-3xl font-bold tracking-tight mb-2">{{ product.name }}</h1>
          <p class="text-gray-600 text-sm leading-relaxed mb-6">{{ product.description }}</p>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="(tag, index) in product.tags" :key="index" class="text-xs bg-brand-bg px-3 py-1 text-gray-800 tracking-wide font-medium">
              {{ tag }}
            </span>
          </div>

          <div class="flex items-baseline gap-3 mb-6">
            <span class="text-2xl font-bold">${{ singleProductPrice }}</span>
            <span v-if="product.discount > 0" class="text-sm text-gray-400 line-through">
              ${{ product.price }}
            </span>
          </div>
        </div>

        <div>
          <div v-if="!product.isAvailable" class="badge badge-error gap-2 mb-2 rounded-none text-white font-semibold">
            Out of Stock
          </div>
          
          <div v-if="product.isAvailable" class="flex items-center justify-between gap-4 mb-4 bg-brand-bg p-3 rounded-md border border-gray-100">
            <div class="flex items-center gap-3">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity:</span>
              <div class="flex items-center border border-brand-text bg-brand-card">
                <button @click="decreaseQty" class="px-2.5 py-1 font-bold hover:bg-gray-100 transition-colors">-</button>
                <span class="px-3 font-semibold text-sm w-8 text-center">{{ product.quantity }}</span>
                <button @click="increaseQty" class="px-2.5 py-1 font-bold hover:bg-gray-100 transition-colors">+</button>
              </div>
            </div>
            
            <div class="text-right">
              <span class="text-xs text-gray-400 block">Subtotal</span>
              <span class="text-sm font-bold text-brand-text">${{ subtotalPrice }}</span>
            </div>
          </div>

          <button 
            @click="addToCart"
            class="btn w-full rounded-none tracking-widest uppercase text-sm font-medium transition-all"
            :class="product.isAvailable ? 'bg-brand-text text-brand-card hover:bg-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
            :disabled="!product.isAvailable"
          >
            {{ product.isAvailable ? 'Add to Bag' : 'Sold Out' }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="text-xl font-bold tracking-wider uppercase mb-6 text-gray-800">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div v-for="item in relatedProducts" :key="item.id" class="border border-gray-100 p-4 flex flex-col justify-between bg-brand-card rounded-lg">
          <img :src="item.image" :alt="item.name" class="w-full h-40 object-cover mb-3 rounded-md" />
          <div>
            <h3 class="font-medium text-sm mb-1 text-gray-900">{{ item.name }}</h3>
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-brand-text">${{ item.price - item.discount }}</span>
              <span v-if="item.discount > 0" class="text-xs text-gray-400 line-through">${{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>