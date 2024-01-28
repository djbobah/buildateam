import { Router } from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = new Router();

export const routerGetProducts = router.get("/", getAllProducts);
