import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from './productStore'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useCartStore = defineStore('cart', () => {
  const productStore = useProductStore()
  const items = useLocalStorage('cart_items', [])

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const netPrice = item.price - item.discount
      return sum + (netPrice * item.quantity)
    }, 0)
  })

  const totalItemsCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const addToCart = async (product, customQuantity = 1) => {
    if (product.stock < customQuantity) return

    const existingItem = items.value.find(item => item.id == product.id)
    if (existingItem) {
      existingItem.quantity += customQuantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        quantity: customQuantity
      })
    }

    for (let i = 0; i < customQuantity; i++) {
      await productStore.decreaseStock(product.id)
    }
  }

  const removeFromCart = (productId) => {
    const index = items.value.findIndex(item => item.id == productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalPrice,
    totalItemsCount,
    addToCart,
    removeFromCart,
    clearCart
  }
})