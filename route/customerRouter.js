import { Router } from 'express';
import * as customerService from "../service/customerService.js"

export const router = Router();

router.get("/", customerService.getCustomers);
router.get("/:id", customerService.getCustomer);
router.get("/search/:email", customerService.getCustomerByEmail);