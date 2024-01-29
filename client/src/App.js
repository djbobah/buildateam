import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { getIsLoading, getProducts, loadProducts } from "./store/products";
import ProductsList from "./components/ProductsList";

function App() {
  const dispatch = useDispatch();
  // const isLoading = dispatch(getIsLoading());
  // let products = {};
  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  // console.log(isLoading);
  // if (!isLoading) {
  //   products = dispatch(getProducts());
  //   console.log(products);
  // }

  return (
    <div className="App">
      <ProductsList />
    </div>
  );
}

export default App;
