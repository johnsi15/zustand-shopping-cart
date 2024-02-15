import { useShoppingCart } from './store/shoppingCart'
import { useShallow } from 'zustand/react/shallow'
import './App.css'

interface Product {
  id: number
  name: string
  price: number
}

function App() {
  // const items = useShoppingCart(state => state.items)
  // const addItem = useShoppingCart(state => state.addItem)
  // const increaseQuantity = useShoppingCart(state => state.increaseQuantity)
  // const decreaseQuantity = useShoppingCart(state => state.decreaseQuantity)
  // const removeItem = useShoppingCart(state => state.removeItem)
  // const clearCart = useShoppingCart(state => state.clearCart)
  // const getTotalPrice = useShoppingCart(state => state.getTotalPrice)

  const { items, addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart, getTotalPrice } = useShoppingCart(
    useShallow(state => ({
      items: state.items,
      addItem: state.addItem,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
      removeItem: state.removeItem,
      clearCart: state.clearCart,
      getTotalPrice: state.getTotalPrice,
    }))
  )

  const handlerAdd = (product: Product) => () => {
    addItem(product)
  }

  const handlerRemove = (id: number) => () => {
    removeItem(id)
  }

  const handlerIncreaseQuantity = (id: number) => () => {
    increaseQuantity(id)
  }

  const handlerDecreaseQuantity = (id: number) => () => {
    decreaseQuantity(id)
  }

  const handlerClearCart = () => {
    clearCart()
  }

  return (
    <>
      <main>
        <h1>List products</h1>
        <ul>
          <li>
            <span>Product #1: </span>
            <span>Product Price: 500</span>
            <button onClick={handlerAdd({ id: 1, name: 'Product 01', price: 500 })}>Add item cart</button>
          </li>
          <li>
            <span>Product #2: </span>
            <span>Product Price: 700</span>
            <button onClick={handlerAdd({ id: 2, name: 'Product 02', price: 700 })}>Add item cart</button>
          </li>
          <li>
            <span>Product #3: </span>
            <span>Product Price: 300</span>
            <button onClick={handlerAdd({ id: 3, name: 'Product 03', price: 300 })}>Add item cart</button>
          </li>
        </ul>

        <section className='list_shopping'>
          <h2>List Shopping cart</h2>
          {items.length === 0 && <p>Cart is empty</p>}
          {items.length > 0 && (
            <div className='totales'>
              <p>Total items: {items.length}</p>
              <h3>Total Price: {getTotalPrice()}</h3>
              <button onClick={handlerClearCart}>Clear cart</button>
            </div>
          )}
        </section>
        <ul>
          {items.map(item => {
            return (
              <li key={item.product.id}>
                <span>Name: {item.product.name}</span>
                <span>Price: {item.product.price}</span>
                <span>Quantity: {item.quantity}</span>
                <button onClick={handlerIncreaseQuantity(item.product.id)}>+</button>
                <button onClick={handlerDecreaseQuantity(item.product.id)} disabled={item.quantity === 1}>
                  {' '}
                  -{' '}
                </button>
                <button onClick={handlerRemove(item.product.id)}>Remove</button>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export default App
