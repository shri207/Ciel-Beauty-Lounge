import { supabase } from '../utils/supabase.js';

export const getServices = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', req.params.id)
            .single();
        if (error) throw error;
        res.json(data);
    } catch(error) {
        next(error);
    }
}

export const createService = async (req, res, next) => {
  try {
    const { title, description, price, duration, display_order, status } = req.body;
    let image_url = null;

    if (req.file) {
      image_url = `/uploads/services/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('services')
      .insert([{
        title,
        description,
        price: parseFloat(price),
        duration: parseInt(duration),
        image_url,
        display_order: parseInt(display_order) || 0,
        status
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { title, description, price, duration, display_order, status } = req.body;
    const updateData = {
        title,
        description,
        price: price ? parseFloat(price) : undefined,
        duration: duration ? parseInt(duration) : undefined,
        display_order: display_order ? parseInt(display_order) : undefined,
        status,
        updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    if (req.file) {
      updateData.image_url = `/uploads/services/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
        return res.status(404).json({ message: 'Service not found' });
    }
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};
