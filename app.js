import express, { json } from 'express';
import dotenv from 'dotenv';
import trucksRouter from './routes/entryRoutes.js';

dotenv.config();

const app = express();

// Parse JSON requests
app.use(json());
app.use('/api/trucks', trucksRouter);
app.use('/api', trucksRouter);

export default app;
