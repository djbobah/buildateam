import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getProducts } from "../store/products";
import Product from "./Product";
import styles from "./ProductList.module.css";
import CanvasImage from "./CanvasImage";

const ProductsList = () => {
  let isLoading = useSelector(getIsLoading());
  let products = useSelector(getProducts());

  console.log(isLoading);
  console.log(products);

  return (
    <div className={styles["grid-container"]}>
      {products &&
        products.map((item, i) => (
          <Product key={item.idProduct + " " + i} data={item} ind={i} />
        ))}
    </div>
  );
};

export default ProductsList;
