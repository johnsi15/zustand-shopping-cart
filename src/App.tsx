import { useShoppingCart } from './store/shoppingCart'
import './App.css'

function App() {
  const items = useShoppingCart(state => state.items)
  const addItem = useShoppingCart(state => state.addItem)
  const removeItem = useShoppingCart(state => state.removeItem)

  const handlerAdd = () => {
    addItem({ id: 1, name: 'Product 01', price: 500 })
  }

  const handlerRemove = (id: number) => () => {
    removeItem(id)
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

        <h2>List item</h2>
        <ul>
          {items.map(item => {
            return (
              <li>
                <span>Name: {item.product.name}</span>
                <span>Price: {item.product.price}</span>
                <span>Quantity: {item.quantity}</span>
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
