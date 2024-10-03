import "./App.css";
import { CartContextProvider } from "./context/cartContext";
import { ProductContextProvider } from "./context/productContext";
import { Allroutes } from "./routes/AllRoutes";

function App() {
  return (
    <CartContextProvider>
      <ProductContextProvider>
        <Allroutes />
      </ProductContextProvider>
    </CartContextProvider>
  );
}

export default App;
