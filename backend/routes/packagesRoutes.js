import express from 'express';
import { getPackages, createPackage, updatePackage, deletePackage } from '../controllers/packagesController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getPackages);
router.post('/', requireAuth, upload.single('image'), createPackage);
router.put('/:id', requireAuth, upload.single('image'), updatePackage);
router.delete('/:id', requireAuth, deletePackage);

export default router;
