import { supabase } from '../utils/supabase.js';

export const getPackages = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createPackage = async (req, res, next) => {
  try {
    const { name, description, price, discount, status } = req.body;
    let image_url = null;

    if (req.file) {
      image_url = `/uploads/packages/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('packages')
      .insert([{
        name,
        description,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
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

export const updatePackage = async (req, res, next) => {
  try {
    const { name, description, price, discount, status } = req.body;
    const updateData = {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        discount: discount ? parseFloat(discount) : undefined,
        status,
        updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    if (req.file) {
      updateData.image_url = `/uploads/packages/${req.file.filename}`;
    }

    const { data, error } = await supabase
      .from('packages')
      .update(updateData)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
        return res.status(404).json({ message: 'Package not found' });
    }
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    next(error);
  }
};
