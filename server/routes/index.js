import { Router } from "express";
import { routerGetProducts } from "./productsRouter.js";

const router = new Router();

router.use("/products", routerGetProducts);

export default router;
