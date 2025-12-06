import { Router } from 'express';
import * as orderService from "../service/orderService.js"

export const router = Router();

router.get("/", orderService.getOrders);
router.get("/:id", orderService.getOrder);
router.post("/", orderService.createOrder);
router.delete("/:id", orderService.deleteOrder);
router.put("/:id", orderService.updateOrder);