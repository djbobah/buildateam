import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getProducts } from "../store/products";
import Product from "./Product";

const ProductsList = () => {
  let isLoading = useSelector(getIsLoading());
  let products = useSelector(getProducts());
  // setTimeout(() => {
  //   isLoading = dispatch(getProducts());

  // }, 9000);

  const style = {
    margin: "30px",
    position: "relative",

    // display: "flex",
    // alignContent: "top",
    // justifyContent: "center",
    // gap: "10px",
  };

  console.log(isLoading);
  console.log(products);

  return (
    <div style={style}>
      {products &&
        products.map((item, i) => (
          <Product key={item.idProduct + i} data={item} />
        ))}
    </div>
  );
};

export default ProductsList;
