import express from 'express';
import { getGallery, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', requireAuth, upload.single('image'), createGalleryImage);
router.put('/:id', requireAuth, upload.single('image'), updateGalleryImage);
router.delete('/:id', requireAuth, deleteGalleryImage);

export default router;
