import { Router } from 'express';
import * as productService from "../service/productService.js"

export const router = Router();

router.get("/", productService.getProducts);
router.get("/:id", productService.getProduct);
router.get("/search/:code", productService.getProductByCode);
router.post("/", productService.createProduct);
router.put("/:id", productService.updateProduct);
router.delete("/:id", productService.deleteProduct);