# Leo Turf API Reference

## Base URL
```
http://localhost:5000/api
```

---

## Public Endpoints

### 1. Get Available Slots

**Endpoint:** `GET /slots`

**Query Parameters:**
- `date` (required): Date in format `YYYY-MM-DD`

**Example Request:**
```bash
GET /slots?date=2026-04-20
```

**Response:**
```json
{
  "date": "2026-04-20",
  "slots": [
    {
      "time": "06:00 AM - 07:00 AM",
      "startHour": 6,
      "endHour": 7,
      "status": "available",
      "available": true
    },
    {
      "time": "07:00 AM - 08:00 AM",
      "startHour": 7,
      "endHour": 8,
      "status": "booked",
      "available": false
    }
  ],
  "peakHours": [18, 19, 20, 21]
}
```

**Status Values:**
- `available`: Slot is free
- `booked`: Slot already booked
- `blocked`: Slot blocked by admin
- `past`: Time has passed for today

---

### 2. Create Booking

**Endpoint:** `POST /book`

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "date": "2026-04-20",
  "slots": ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM"]
}
```

**Request Validation:**
- `name`: Required, string
- `phone`: Required, exactly 10 digits
- `date`: Required, future date in `YYYY-MM-DD` format
- `slots`: Required, array of time strings, must be continuous

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "date": "2026-04-20",
    "slots": ["06:00 AM - 07:00 AM"]
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Booking confirmed",
  "bookingId": "507f1f77bcf86cd799439011",
  "totalPrice": 1000,
  "date": "2026-04-20",
  "slots": ["06:00 AM - 07:00 AM"],
  "name": "John Doe"
}
```

**Error Responses:**
```json
{
  "error": "Cannot book past dates"
}
```

```json
{
  "error": "Slots must be continuous"
}
```

```json
{
  "error": "Some slots are already booked"
}
```

**Pricing:**
- ₹1000 per hour (slot)
- Total = slots × 1000

---

### 3. Get Next Available Slot

**Endpoint:** `GET /next-available`

**Example Request:**
```bash
GET /next-available
```

**Response:**
```json
{
  "nextAvailable": {
    "date": "2026-04-20",
    "time": "08:00 AM - 09:00 AM",
    "price": 1000
  }
}
```

**Response (No slots available):**
```json
{
  "nextAvailable": null
}
```

---

## Admin Endpoints

### Authentication Header
All admin endpoints require:
```
Authorization: Bearer <token>
```

Where `<token>` is obtained from the login endpoint.

---

### 1. Admin Login

**Endpoint:** `POST /admin/login`

**Request Body:**
```json
{
  "passcode": "123456"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"passcode": "123456"}'
```

**Success Response:**
```json
{
  "success": true,
  "token": "YWRtaW46MTIzNDU2",
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "error": "Invalid passcode"
}
```

---

### 2. Get All Bookings

**Endpoint:** `GET /admin/bookings`

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10

**Example Request:**
```bash
GET /admin/bookings?page=1&limit=10
```

**Response:**
```json
{
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "phone": "9876543210",
      "date": "2026-04-20",
      "slots": ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM"],
      "totalPrice": 2000,
      "createdAt": "2026-04-17T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

---

### 3. Get Calendar View

**Endpoint:** `GET /admin/calendar`

**Query Parameters:**
- `month` (required): Month in format `YYYY-MM`

**Example Request:**
```bash
GET /admin/calendar?month=2026-04
```

**Response:**
```json
{
  "month": "2026-04",
  "calendar": {
    "2026-04-20": {
      "bookings": 3,
      "slots": ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM"]
    },
    "2026-04-21": {
      "bookings": 1,
      "slots": ["08:00 PM - 09:00 PM"]
    }
  }
}
```

---

### 4. Block Slots

**Endpoint:** `POST /admin/block`

**Request Body:**
```json
{
  "date": "2026-04-20",
  "slots": ["06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM"],
  "reason": "Maintenance"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Slots blocked"
}
```

---

### 5. Unblock Slots

**Endpoint:** `POST /admin/unblock`

**Request Body:**
```json
{
  "date": "2026-04-20",
  "slots": ["06:00 AM - 07:00 AM"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Slots unblocked"
}
```

---

### 6. Delete Booking

**Endpoint:** `DELETE /admin/booking/:id`

**Example Request:**
```bash
DELETE /admin/booking/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Booking deleted"
}
```

**Error Response (404):**
```json
{
  "error": "Booking not found"
}
```

---

### 7. Add Manual Booking

**Endpoint:** `POST /admin/add-booking`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "phone": "9876543211",
  "date": "2026-04-20",
  "slots": ["08:00 AM - 09:00 AM"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Manual booking added",
  "booking": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "phone": "9876543211",
    "date": "2026-04-20",
    "slots": ["08:00 AM - 09:00 AM"],
    "totalPrice": 1000,
    "createdAt": "2026-04-17T10:35:00Z"
  }
}
```

---

## Time Slots Reference

**Operating Hours:** 6:00 AM to 12:00 AM (midnight)

**All Available Slots:**
```
06:00 AM - 07:00 AM
07:00 AM - 08:00 AM
08:00 AM - 09:00 AM
09:00 AM - 10:00 AM
10:00 AM - 11:00 AM
11:00 AM - 12:00 PM
12:00 PM - 01:00 PM
01:00 PM - 02:00 PM
02:00 PM - 03:00 PM
03:00 PM - 04:00 PM
04:00 PM - 05:00 PM
05:00 PM - 06:00 PM
06:00 PM - 07:00 PM (Peak)
07:00 PM - 08:00 PM (Peak)
08:00 PM - 09:00 PM (Peak)
09:00 PM - 10:00 PM (Peak)
10:00 PM - 11:00 PM
11:00 PM - 12:00 AM
```

**Peak Hours:** 6 PM - 10 PM

---

## Error Codes

| Code | Message | Meaning |
|------|---------|---------|
| 400 | All fields are required | Missing request body fields |
| 400 | Invalid phone number | Phone not 10 digits |
| 400 | Cannot book past dates | Selected date is in the past |
| 400 | Slots must be continuous | Non-consecutive slots selected |
| 400 | Some slots are already booked | Slot conflicts |
| 400 | Passcode required | Missing passcode in login |
| 401 | Unauthorized | Missing or invalid token |
| 401 | Invalid passcode | Wrong admin passcode |
| 404 | Booking not found | Booking ID doesn't exist |
| 500 | Internal server error | Server-side error |

---

## Rate Limiting

No rate limiting implemented. For production, consider adding rate limiting middleware.

---

## CORS

CORS is enabled for the configured `CLIENT_URL` in environment variables.

---

## Data Formats

**Date Format:** `YYYY-MM-DD` (e.g., 2026-04-20)

**Time Format:** `HH:MM AM/PM - HH:MM AM/PM` (e.g., 06:00 AM - 07:00 AM)

**Phone Format:** 10 digits (e.g., 9876543210)

**Currency:** INR (₹)

---

## Testing with Postman

1. Create collection: "Leo Turf API"
2. Set base URL: `http://localhost:5000/api`
3. Add requests for each endpoint
4. Save token from login response in environment variable: `{{adminToken}}`
5. Use in Authorization header: `Bearer {{adminToken}}`

---

Good luck with integration! ⚽
