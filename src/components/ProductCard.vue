<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const navigateToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

onMounted(() => {
  console.log(`ProductCard.vue mounted for ID: ${props.product.id}`)
})

onUnmounted(() => {
  console.log(`ProductCard.vue unmounted for ID: ${props.product.id}`)
})
</script>

<template>
  <div @click="navigateToDetail" class="border border-gray-100 p-4 flex flex-col justify-between bg-brand-card rounded-lg cursor-pointer hover:shadow-lg hover:border-brand-text group transition-all duration-300">
    <div class="relative overflow-hidden mb-3 rounded-md aspect-square bg-brand-bg flex items-center justify-center">
      <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
      <span v-if="product.badge" class="absolute top-2 left-2 bg-brand-text text-brand-card text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">
        {{ product.badge }}
      </span>
    </div>
    <div>
      <h3 class="font-bold text-sm mb-1 text-gray-900 group-hover:text-brand-text transition-colors">{{ product.name }}</h3>
      <div class="flex justify-between items-center mt-2">
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-brand-text">${{ product.price - product.discount }}</span>
          <span v-if="product.discount > 0" class="text-xs text-gray-400 line-through">${{ product.price }}</span>
        </div>
        <span class="text-[10px] text-gray-400 font-medium tracking-wide">Stock: {{ product.stock }}</span>
      </div>
    </div>
  </div>
</template>