import { supabase } from '../utils/supabase.js';

export const getGallery = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createGalleryImage = async (req, res, next) => {
  try {
    const { caption, category, display_order, visibility } = req.body;
    let image_url = null;

    if (req.file) {
      image_url = `/uploads/gallery/${req.file.filename}`;
    } else {
        return res.status(400).json({ message: "Image is required" });
    }

    const { data, error } = await supabase
      .from('gallery')
      .insert([{
        image_url,
        caption,
        category,
        display_order: parseInt(display_order) || 0,
        visibility: visibility === 'false' ? false : true
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const updateGalleryImage = async (req, res, next) => {
  try {
    const { caption, category, display_order, visibility } = req.body;
    const updateData = {
        caption,
        category,
        display_order: display_order ? parseInt(display_order) : undefined,
        visibility: visibility !== undefined ? (visibility === 'true' || visibility === true) : undefined
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    if (req.file) {
      updateData.image_url = `/uploads/gallery/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('gallery')
      .update(updateData)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
        return res.status(404).json({ message: 'Image not found' });
    }
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryImage = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};
