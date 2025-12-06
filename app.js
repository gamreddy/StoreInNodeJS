import express from "express";
import bodyParser from "body-parser";
import { router as productRouter } from './route/productRouter.js';
import { router as customerRouter } from './route/customerRouter.js';
import { router as orderRouter } from './route/orderRouter.js';
import { router as adminRouter } from './route/adminRouter.js';

export const app = express();

// CONFIGURATIONS
app.use(bodyParser.json());

// DEFAULT
app.get('/', (req, res) => {
  res.send('Default Root.')
})

// CUSTOM ROUTES
app.use('/api/products', productRouter);
app.use('/api/customers', customerRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin', adminRouter);
// ------------------------------------------
// DEFAULT 404 NOT FOUND ERROR
app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

// ------------------------------------------
// DEFAULT 500 INTERNAL SERVER ERROR
app.use((err, _, res) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
