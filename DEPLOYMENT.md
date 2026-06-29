# Deployment Guide (AWS EC2)

This guide covers deploying the Salon Fullstack Application to an AWS EC2 instance running Ubuntu.

## Prerequisites

1. An AWS EC2 instance (Ubuntu 22.04 LTS recommended).
2. A Supabase project set up with the provided SQL schema (`backend/database/sql/schema.sql`).
3. Domain name pointing to your EC2 instance's public IP (optional but recommended).

## Step 1: Server Setup

Connect to your EC2 instance via SSH:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

Install Node.js, npm, and Nginx:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
```

Install PM2 globally:
```bash
sudo npm install -g pm2
```

## Step 2: Clone and Build Project

Clone the repository and install dependencies:
```bash
git clone <your-repo-url> salon-app
cd salon-app
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

Build the frontend for production:
```bash
npm run build:frontend
```

## Step 3: Environment Variables

Create `.env` file in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env
```
Fill in your `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, and ensure `NODE_ENV=production`.

*(For the frontend, it uses `/api` relative path in production, so `VITE_API_URL` isn't strictly needed if served from the same domain, but you can set it if deploying separately).*

## Step 4: Start Application with PM2

Run the application using the ecosystem file:
```bash
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

## Step 5: Configure Nginx

Create a new Nginx configuration file:
```bash
# Create /etc/nginx/sites-available/salon-app
```
Paste the contents of `nginx.conf.example`, replacing `yourdomain.com` with your actual domain or IP.

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/salon-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## Step 6: SSL Certificate (Optional but Recommended)

Use Certbot to secure your domain with HTTPS:
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Your application is now live!
