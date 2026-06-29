import { supabase } from '../utils/supabase.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const { customer_name, rating, review, status } = req.body;
    let image_url = null;

    if (req.file) {
      image_url = `/uploads/testimonials/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([{
        customer_name,
        rating: parseInt(rating),
        review,
        image_url,
        status
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { customer_name, rating, review, status } = req.body;
    const updateData = {
        customer_name,
        rating: rating ? parseInt(rating) : undefined,
        review,
        status
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    if (req.file) {
      updateData.image_url = `/uploads/testimonials/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};
