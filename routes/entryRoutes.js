import { Router } from 'express';
const router = Router();
import {
  addTruckEntry,
  getDailySummary,
  getTruckHistory,
  listTrucks,
  listWasteTypes,
  deleteTruckEntry,
  updateTruckEntry
} from '../controllers/entryControllers.js';

router.post('/entry', addTruckEntry);
router.get('/summary/daily', getDailySummary);
router.get('/truck/:number/history', getTruckHistory);

router.get('/trucks', listTrucks);
router.get('/waste-types', listWasteTypes);
router.delete('/entry/:id', deleteTruckEntry);
router.put('/entry/:id', updateTruckEntry);

export default router;
