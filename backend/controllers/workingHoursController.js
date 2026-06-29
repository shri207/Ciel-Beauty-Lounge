import { supabase } from '../utils/supabase.js';

export const getWorkingHours = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('working_hours')
      .select('*')
      .order('day_of_week', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateWorkingHours = async (req, res, next) => {
  try {
    const { hours } = req.body;

    if (!Array.isArray(hours)) {
        return res.status(400).json({ message: "Invalid format. Expected an array of hours." });
    }

    // Process each day and update or insert
    const promises = hours.map(async (day) => {
       const { day_of_week, is_open, opening_time, closing_time, break_start, break_end, max_bookings_per_slot, slot_interval } = day;
       return supabase
        .from('working_hours')
        .upsert({
            day_of_week,
            is_open,
            opening_time,
            closing_time,
            break_start,
            break_end,
            max_bookings_per_slot,
            slot_interval
        }, { onConflict: 'day_of_week' });
    });

    await Promise.all(promises);

    res.json({ message: 'Working hours updated successfully' });
  } catch (error) {
    next(error);
  }
};
