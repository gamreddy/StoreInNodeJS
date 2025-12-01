import { Router } from 'express';
import * as orderService from "../service/orderService.js"

export const router = Router();

// load the test data
orderService.createSeed();

router.get("/", orderService.getOrders);
router.get("/:id", orderService.getOrder);
router.post("/", orderService.createOrder);