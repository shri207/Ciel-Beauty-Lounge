import { supabase } from '../utils/supabase.js';

export const getAppointments = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services ( title ),
        packages ( name )
      `)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    const {
        customer_name,
        customer_email,
        customer_phone,
        service_id,
        package_id,
        appointment_date,
        appointment_time,
        notes
    } = req.body;

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        customer_name,
        customer_email,
        customer_phone,
        service_id: service_id || null,
        package_id: package_id || null,
        appointment_date,
        appointment_time,
        notes,
        status: 'pending'
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const updateData = { ...req.body, updated_at: new Date().toISOString() };

    // Prevent updating id
    delete updateData.id;

    const { data, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
        return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
