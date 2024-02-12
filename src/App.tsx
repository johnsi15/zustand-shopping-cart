import { useShoppingCart } from './store/shoppingCart'
import './App.css'

function App() {
  const items = useShoppingCart(state => state.items)
  const addItem = useShoppingCart(state => state.addItem)
  const increaseQuantity = useShoppingCart(state => state.increaseQuantity)
  const decreaseQuantity = useShoppingCart(state => state.decreaseQuantity)
  const removeItem = useShoppingCart(state => state.removeItem)
  const clearCart = useShoppingCart(state => state.clearCart)

  const handlerAdd = () => {
    addItem({ id: 1, name: 'Product 01', price: 500 })
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
        <ul>
          <li>
            <span>Product Name: </span>
            <span>Product Price: </span>
            <button onClick={handlerAdd}>Add item card</button>
          </li>
        </ul>

        <h2>List Shopping cart</h2>
        {items.length === 0 && <p>Cart is empty</p>}
        {items.length > 0 && (
          <div>
            <p>Total items: {items.length}</p>
            <button onClick={handlerClearCart}>Clear cart</button>
          </div>
        )}
        <ul>
          {items.map(item => {
            return (
              <li key={item.product.id}>
                <span>Name: {item.product.name}</span>
                <span>Price: {item.product.price}</span>
                <span>Quantity: {item.quantity}</span>
                <button onClick={handlerIncreaseQuantity(item.product.id)}>+</button>
                <button onClick={handlerDecreaseQuantity(item.product.id)}> - </button>
                <button onClick={handlerRemove(item.product.id)}>Remove Item</button>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

export default App
