import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import packagesRoutes from "./routes/packagesRoutes.js";
import testimonialsRoutes from "./routes/testimonialsRoutes.js";
import workingHoursRoutes from "./routes/workingHoursRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // allow images to be loaded cross-origin
  contentSecurityPolicy: false, // relaxed for production React build to work easily without specific nonce setup
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/working-hours", workingHoursRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Production Setup: Serve React Frontend
if (process.env.NODE_ENV === 'production') {
    const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
    app.use(express.static(frontendDist));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendDist, 'index.html'));
    });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
