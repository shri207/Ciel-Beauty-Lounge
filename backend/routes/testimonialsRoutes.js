import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', requireAuth, upload.single('image'), createTestimonial);
router.put('/:id', requireAuth, upload.single('image'), updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
