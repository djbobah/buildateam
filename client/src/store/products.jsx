import { createSlice } from "@reduxjs/toolkit";
import ProductService from "../services/product.service";

const productsSlice = createSlice({
  name: "products",
  initialState: { entities: null, isLoading: true, error: null },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsRecived, productsRequestFiled } = actions;

export const loadProducts = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const data = await ProductService.getProducts();
    dispatch(productsRecived(data));
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const getProducts = () => (state) => {
  // if (state.products) {
  return state.products.entities;
  // } else return "not loaded escho";
};
export const getIsLoading = () => (state) => state.products.isLoading;

export default productsReducer;
