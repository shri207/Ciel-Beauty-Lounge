import { supabase } from '../utils/supabase.js';

export const getSettings = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('business_settings')
      .select('*');

    if (error) throw error;

    // Convert array of rows to a structured object
    const settings = data.reduce((acc, row) => {
        acc[row.key] = row.value;
        return acc;
    }, {});

    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
        return res.status(400).json({ message: "Invalid settings format" });
    }

    // Process each setting key and update or insert
    const promises = Object.keys(settings).map(async (key) => {
       return supabase
        .from('business_settings')
        .upsert({ key, value: settings[key], updated_at: new Date().toISOString() }, { onConflict: 'key' });
    });

    await Promise.all(promises);

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
};
