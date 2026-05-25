import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'

export const useProductStore = defineStore('product', () => {
  const api = useApi()
  const products = ref([])

  const fetchProducts = async () => {
    await api.getAll('products')
    if (api.data.value) {
      products.value = api.data.value
    }
  }

  const decreaseStock = async (productId) => {
    const product = products.value.find(p => p.id == productId)
    if (product && product.stock > 0) {
      const updatedProduct = { ...product, stock: product.stock - 1 }
      await api.update('products', productId, updatedProduct)
      if (!api.error.value) {
        product.stock--
      }
    }
  }

  const getProductById = computed(() => {
    return (id) => products.value.find(p => p.id == id)
  })

  const loading = computed(() => api.loading.value)
  const error = computed(() => api.error.value)

  return {
    products,
    loading,
    error,
    fetchProducts,
    decreaseStock,
    getProductById
  }
})