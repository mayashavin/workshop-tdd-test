import './App.css'
import { Cart } from './components/Cart/Cart'

function App() {
  return (
    <>
      <header>
        <Cart />
      </header>
      <main>
        <h1>TDD Testing Workshop - Pizza Store</h1>
        <p>
          Welcome to the TDD Testing Workshop - Pizza Store! This is a simple
          application that allows you to search for pizza and add it to your cart.
        </p>
      </main>
    </>
  )
}

export default App
