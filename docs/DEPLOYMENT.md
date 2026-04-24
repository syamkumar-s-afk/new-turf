# Leo Turf - Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying Leo Turf to production on cloud platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] Update admin passcode from default (123456)
- [ ] Configure production MongoDB (Atlas recommended)
- [ ] Set up production domain/subdomain
- [ ] Test all features locally
- [ ] Update contact information
- [ ] Configure WhatsApp number
- [ ] Review environment variables
- [ ] Test on mobile devices

---

## Backend Deployment

### Option 1: Deploy to Render.com

**Free tier available**

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `/server` directory as root

3. **Configure Settings**
   - Name: `leo-turf-server`
   - Environment: `Node`
   - Region: Choose closest to Madurai
   - Plan: Free tier available

4. **Set Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leo-turf
   ADMIN_PASSCODE=your-secure-passcode
   CLIENT_URL=https://your-frontend-url.com
   WHATSAPP_NUMBER=919876543210
   PORT=5000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render auto-deploys on GitHub push

**Your API URL:** `https://leo-turf-server.onrender.com`

---

### Option 2: Deploy to Railway.app

**Simple and fast**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository

3. **Set Root Directory**
   - Go to project settings
   - Set root directory to `/server`

4. **Add Environment Variables**
   ```
   MONGODB_URI=your-mongodb-uri
   ADMIN_PASSCODE=your-passcode
   CLIENT_URL=https://your-frontend-url
   WHATSAPP_NUMBER=919876543210
   ```

5. **Deploy**
   - Click "Deploy"
   - Railway auto-deploys on push

**Your API URL:** `https://your-project.up.railway.app`

---

### Option 3: Deploy to Heroku (Paid)

Heroku changed pricing model. Not recommended for free deployment.

---

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

**Best for React apps**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects React

3. **Configure Project**
   - Root directory: `/client`
   - Build command: `npm run build` (auto)
   - Output directory: `build` (auto)

4. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   REACT_APP_WHATSAPP_NUMBER=919876543210
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys
   - Auto-deploys on GitHub push

**Your Site URL:** `https://your-project.vercel.app`

---

### Option 2: Deploy to Netlify

**Alternative to Vercel**

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Choose your GitHub repo

3. **Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Add Environment Variables**
   - Go to "Site settings" → "Build & deploy" → "Environment"
   - Add `REACT_APP_API_URL` and `REACT_APP_WHATSAPP_NUMBER`

5. **Deploy**
   - Click "Deploy site"
   - Auto-deploys on GitHub push

**Your Site URL:** `https://your-project.netlify.app`

---

### Option 3: Deploy to GitHub Pages

**Simple static hosting**

1. **Install GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/leo-turf",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

**Your Site URL:** `https://yourusername.github.io/leo-turf`

---

## Database Setup

### MongoDB Atlas (Cloud)

**Recommended for production**

1. **Create Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up (free tier available)

2. **Create Cluster**
   - Click "Create" → "Dedicated"
   - Choose cloud provider and region
   - Select M0 (free tier)

3. **Setup Security**
   - Go to "Database Access"
   - Create user with strong password
   - Go to "Network Access"
   - Add IP address or allow 0.0.0.0/0 (less secure)

4. **Get Connection String**
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Format: `mongodb+srv://user:password@cluster.mongodb.net/leo-turf`

5. **Update Backend**
   - Add to environment variables: `MONGODB_URI=your-connection-string`

---

## Domain Configuration

### Connect Custom Domain

1. **Purchase Domain**
   - Buy from Namecheap, GoDaddy, or similar

2. **Add to Vercel/Netlify**
   - Go to project settings
   - Click "Add domain"
   - Enter your domain
   - Follow DNS setup instructions

3. **Update DNS Records**
   - Point DNS to your hosting provider
   - Usually A record and/or CNAME records

4. **Enable HTTPS**
   - Most platforms auto-enable SSL
   - Certificate auto-renewal enabled

---

## Environment Variables Summary

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/leo-turf

# Server
PORT=5000
NODE_ENV=production

# Security
ADMIN_PASSCODE=your-secure-6-digit-passcode

# Client
CLIENT_URL=https://your-domain.com

# Contact
WHATSAPP_NUMBER=919876543210
```

### Frontend (.env)
```env
# API
REACT_APP_API_URL=https://your-api.com/api

# Contact
REACT_APP_WHATSAPP_NUMBER=919876543210
```

---

## Post-Deployment

### Verify Deployment

1. **Test API**
   ```bash
   curl https://your-backend-url.com/health
   ```

2. **Test Frontend**
   - Visit your domain
   - Check all pages load
   - Test booking flow
   - Test admin panel

3. **Check Console**
   - Monitor frontend for errors
   - Check backend logs

### Performance Optimization

1. **Frontend**
   - Enable compression
   - Optimize images
   - Minify CSS/JS (auto in build)
   - Cache strategy

2. **Backend**
   - Add database indexes
   - Enable response caching
   - Monitor server resources
   - Set up alerting

### Monitoring & Logging

**Render:**
- Built-in logs available
- Email alerts for crashes

**Railway:**
- Real-time logs
- Deployment history
- Resource monitoring

**Vercel:**
- Build logs
- Function invocations
- Error tracking

---

## Troubleshooting

### Backend Not Responding
```bash
# Check logs
curl https://your-backend-url.com/health

# Verify environment variables
# Check MONGODB_URI and other configs
```

### Frontend Blank Page
```
1. Check browser console for errors
2. Verify REACT_APP_API_URL in build
3. Check CORS configuration
4. Verify backend is accessible
```

### MongoDB Connection Error
```
1. Verify connection string
2. Check IP whitelist in Atlas
3. Verify user credentials
4. Check network connectivity
```

### Slow Performance
```
1. Check database query performance
2. Add indexes if needed
3. Enable caching
4. Optimize images
5. Monitor server resources
```

---

## Cost Estimation

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Render Backend | Yes | 750 compute hours/month |
| Railway Backend | Yes | $5 credit/month |
| Vercel Frontend | Yes | Unlimited builds |
| Netlify Frontend | Yes | 300 build minutes/month |
| MongoDB Atlas | Yes | 512MB storage |
| **Total** | **$0** | Can run free for small scale |

---

## Auto-Deployment

All platforms support automatic deployment on GitHub push:

1. Push code to main branch
2. GitHub triggers webhook
3. Platform rebuilds & deploys
4. Changes live in minutes

**No manual deployment needed!**

---

## Backup & Recovery

### Database Backups

**MongoDB Atlas:**
- Automatic backups daily
- Restore from Atlas dashboard
- Manual backup export available

```bash
# Export data
mongoexport --uri "mongodb+srv://..." --collection bookings --out bookings.json

# Import data
mongoimport --uri "mongodb+srv://..." --collection bookings --file bookings.json
```

---

## Security Checklist

- [ ] Change default admin passcode
- [ ] Enable HTTPS/SSL
- [ ] Restrict database IP access
- [ ] Use strong database passwords
- [ ] Enable rate limiting
- [ ] Monitor error logs
- [ ] Keep dependencies updated
- [ ] Use environment variables
- [ ] Disable debug mode in production
- [ ] Set up alerts for crashes

---

## Support

- **Render Support:** https://render.com/docs
- **Railway Support:** https://docs.railway.app
- **Vercel Support:** https://vercel.com/docs
- **Netlify Support:** https://docs.netlify.com
- **MongoDB Support:** https://docs.mongodb.com

---

## Next Steps

1. ✅ Deploy backend
2. ✅ Deploy frontend
3. ✅ Configure domain
4. ✅ Test production
5. ✅ Monitor performance
6. ✅ Gather user feedback

---

**Happy deploying! 🚀⚽🟢**
