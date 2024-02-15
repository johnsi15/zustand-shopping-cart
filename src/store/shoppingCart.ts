import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useShoppingCart = create<ShoppingCart>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const { items } = get()
        const item = items.find(item => item.product.id === product.id)

        if (item) {
          return
        }

        set({ items: [...items, { product, quantity }] })
      },
      removeItem: productId => {
        const { items } = get()

        set({ items: items.filter(item => item.product.id !== productId) })
      },
      increaseQuantity: (productId, quantity = 1) => {
        const { items } = get()

        const newItems = structuredClone(items)
        const itemIndex = newItems.findIndex(item => item.product.id === productId)
        const itemData = newItems[itemIndex]

        newItems[itemIndex] = { ...itemData, quantity: itemData.quantity + quantity }

        set({ items: newItems })
      },
      decreaseQuantity: (productId, quantity = 1) => {
        const { items } = get()

        const newItems = structuredClone(items)
        const itemIndex = newItems.findIndex(item => item.product.id === productId)
        const itemData = newItems[itemIndex]

        const newQuantity = itemData.quantity !== 1 ? itemData.quantity - quantity : quantity

        newItems[itemIndex] = { ...itemData, quantity: newQuantity }

        set({ items: newItems })
      },
      getTotalPrice: () => {
        const { items } = get()

        return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart',
    }
  )
)
