import express from 'express';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointmentsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, getAppointments);
router.post('/', createAppointment); // Public route for booking
router.put('/:id', requireAuth, updateAppointment);
router.delete('/:id', requireAuth, deleteAppointment);

export default router;
