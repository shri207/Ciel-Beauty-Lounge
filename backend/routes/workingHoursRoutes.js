import express from 'express';
import { getWorkingHours, updateWorkingHours } from '../controllers/workingHoursController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getWorkingHours); // Public so frontend knows when available
router.put('/', requireAuth, updateWorkingHours);

export default router;
