import express from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/servicesController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', requireAuth, upload.single('image'), createService);
router.put('/:id', requireAuth, upload.single('image'), updateService);
router.delete('/:id', requireAuth, deleteService);

export default router;
