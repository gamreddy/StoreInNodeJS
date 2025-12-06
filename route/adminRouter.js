import { Router } from 'express';
import * as dataService from "../service/dataService.js"

export const router = Router();

router.get("/loadProducts", dataService.createProducts);
router.get("/loadCustomers", dataService.createCustomers);
router.get("/loadOrders", dataService.createOrders);