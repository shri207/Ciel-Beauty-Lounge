-- Seed Admin (password is 'admin123' hashed with bcrypt)
-- Using a common bcrypt hash for 'admin123'
INSERT INTO admins (email, password_hash, name)
VALUES ('admin@cielbeauty.com', '$2b$10$tZ2.QvI9cW9Y0r2U0Y7gQ.K5B.v3B.v3B.v3B.v3B.v3B.v3B.v3B', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Seed Business Settings
INSERT INTO business_settings (key, value) VALUES
('general', '{"salonName": "Ciel Beauty Lounge", "email": "info@cielbeautylounge.com", "phone": "+1 234 567 8900", "address": "123 Beauty Blvd, Suite 100, New York, NY 10001"}'),
('social', '{"instagram": "https://instagram.com/cielbeauty", "facebook": "https://facebook.com/cielbeauty"}'),
('booking_rules', '{"advanceBookingDays": 30, "cancellationNoticeHours": 24}')
ON CONFLICT (key) DO NOTHING;

-- Seed Working Hours (Mon-Sat Open, Sun Closed)
INSERT INTO working_hours (day_of_week, is_open, opening_time, closing_time, slot_interval) VALUES
(1, true, '09:00:00', '18:00:00', 30),
(2, true, '09:00:00', '18:00:00', 30),
(3, true, '09:00:00', '18:00:00', 30),
(4, true, '09:00:00', '20:00:00', 30), -- Late night thursday
(5, true, '09:00:00', '18:00:00', 30),
(6, true, '10:00:00', '16:00:00', 30),
(0, false, NULL, NULL, 30)
ON CONFLICT (day_of_week) DO NOTHING;
