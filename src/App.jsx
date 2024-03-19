import './App.css'
import { Cart } from './components/Cart/Cart'
import { PizzaList } from './components/PizzaList/PizzaList'

function App() {
  return (
    <>
      <header>
        <Cart />
      </header>
      <main>
        <PizzaList />
      </main>
    </>
  )
}

export default App
