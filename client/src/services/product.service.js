import axios from "axios";

const ProductService = {
  getProducts: async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8081/products",
    });
    return data;
  },
};

export default ProductService;
