import { create } from 'zustand'

interface Product {
  id: number
  name: string
  price: number
}

interface CartItem {
  product: Product
  quantity: number
}

interface ShoppingCart {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  increaseQuantity: (productId: number, quantity?: number) => void
  decreaseQuantity: (productId: number, quantity?: number) => void
  getTotalPrice: () => number
  clearCart: () => void
}

export const useShoppingCart = create<ShoppingCart>((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) => {
    const { items } = get()
    const item = items.find(item => item.product.id === product.id)

    if (item) {
      get().increaseQuantity(product.id, quantity)
      return
    }

    set({ items: [...items, { product, quantity }] })
  },
  removeItem: productId => {
    const { items } = get()
    const item = items.find(item => item.product.id === productId)

    if (item) {
      get().decreaseQuantity(productId, 1)
      return
    }

    set({ items: items.filter(item => item.product.id !== productId) })
  },
  increaseQuantity: (productId, quantity = 1) => {
    const { items } = get()
    const item = items.find(item => item.product.id === productId)
    if (item) {
      item.quantity += quantity
      set({ items: [item] })
    }
  },
  decreaseQuantity: (productId, quantity = 1) => {
    const { items } = get()
    const item = items.find(item => item.product.id === productId)
    if (item) {
      item.quantity -= quantity
      set({ items: [item] })
    }
  },
  getTotalPrice: () => 0,
  clearCart: () => set({ items: [] }),
}))
