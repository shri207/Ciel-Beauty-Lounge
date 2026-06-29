import { supabase } from '../utils/supabase.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Total Bookings
    const { count: totalBookings, error: errorTotal } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true });

    // Today's Bookings
    const { count: todaysBookings, error: errorToday } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('appointment_date', today);

    // Upcoming Bookings
    const { count: upcomingBookings, error: errorUpcoming } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .gt('appointment_date', today)
      .eq('status', 'pending');

    // Completed Services
    const { count: completedServices, error: errorCompleted } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Cancelled Bookings
    const { count: cancelledBookings, error: errorCancelled } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'cancelled');

    // Recent Appointments
    const { data: recentAppointments, error: errorRecent } = await supabase
        .from('appointments')
        .select(`
            *,
            services ( title ),
            packages ( name )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

    if (errorTotal || errorToday || errorUpcoming || errorCompleted || errorCancelled || errorRecent) {
        throw new Error('Error fetching dashboard stats');
    }

    res.json({
        stats: {
            totalBookings: totalBookings || 0,
            todaysBookings: todaysBookings || 0,
            upcomingBookings: upcomingBookings || 0,
            completedServices: completedServices || 0,
            cancelledBookings: cancelledBookings || 0,
            revenuePlaceholder: "$0.00" // Placeholder as requested
        },
        recentAppointments: recentAppointments || []
    });

  } catch (error) {
    next(error);
  }
};
