# Leo Turf - Setup Guide

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas cloud)
- **npm** or **yarn**
- A code editor (VS Code recommended)

---

## 🚀 Quick Start

### 1. Clone & Navigate


`

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `/server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/leo-turf
PORT=5000
ADMIN_PASSCODE=123456
CLIENT_URL=http://localhost:3000
WHATSAPP_NUMBER=919876543210
```

Start MongoDB (if running locally):
```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` file in `/client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WHATSAPP_NUMBER=919876543210
```

Start the app:
```bash
npm start
```

App will open at: `http://localhost:3000`

---

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Download and install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/leo-turf`

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/leo-turf?retryWrites=true&w=majority`)
5. Update `MONGODB_URI` in `/server/.env`

---

## 🔐 Admin Panel Access

**Default Passcode:** `123456`

To change:
1. Edit `/server/.env` and change `ADMIN_PASSCODE` value
2. Restart the server

**Access Admin Panel:**
- Navigate to: `http://localhost:3000/admin`
- Enter the 6-digit passcode
- Manage bookings, block slots, view calendar

---

## 📱 WhatsApp Integration

Update the WhatsApp number in environment variables:

```env
WHATSAPP_NUMBER=919876543210  # Include country code (91 for India)
```

The WhatsApp button will send prefilled messages for easy booking sharing.

---

## 🧪 Testing the Application

### Test Booking Flow:
1. Open `http://localhost:3000`
2. Click "Book Now" button
3. Select a date and time slots
4. Enter name and phone number
5. Confirm booking
6. See success message with booking details

### Test Admin Panel:
1. Navigate to `http://localhost:3000/admin`
2. Enter passcode: `123456`
3. View bookings in table
4. Block/unblock slots
5. View calendar with booking distribution
6. Delete bookings as needed

### Test APIs with cURL:

Get available slots:
```bash
curl http://localhost:5000/api/slots?date=2026-04-20
```

Create booking:
```bash
curl -X POST http://localhost:5000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "date": "2026-04-20",
    "slots": ["06:00 - 07:00", "07:00 - 08:00"]
  }'
```

Admin login:
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"passcode": "123456"}'
```

---

## 📦 Project Structure

```
leo-turf/
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── constants.js
│   ├── models/
│   │   ├── Booking.js
│   │   └── BlockedSlot.js
│   ├── controllers/
│   │   ├── bookingController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── public.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── adminAuth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── landing/
│   │   │   ├── booking/
│   │   │   └── admin/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Booking.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
└── docs/
    ├── SETUP_GUIDE.md (this file)
    ├── API_REFERENCE.md
    └── DEPLOYMENT.md
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# For Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### CORS Errors
- Ensure `CLIENT_URL` in server `.env` matches frontend URL
- Default: `http://localhost:3000`

### API Not Responding
- Check server is running: `http://localhost:5000/health`
- Check browser console for errors
- Verify `REACT_APP_API_URL` in frontend `.env`

---

## 🚀 Deployment

### Deploy Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Set environment variables
4. Deploy

See `DEPLOYMENT.md` for detailed instructions.

---

## 📞 Support

For issues or questions:
- Check `/docs/API_REFERENCE.md` for API details
- Review error messages in browser console
- Check server logs for backend issues

---

## ✅ Checklist Before Going Live

- [ ] Update admin passcode from default
- [ ] Configure WhatsApp number correctly
- [ ] Set up cloud MongoDB (Atlas)
- [ ] Test all booking flows
- [ ] Test admin panel features
- [ ] Update contact information on landing page
- [ ] Configure domain/DNS
- [ ] Set up SSL certificate
- [ ] Test on mobile devices
- [ ] Set up monitoring/alerts

---

Good luck with Leo Turf! ⚽🟢
