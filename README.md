# Aura Elite Launch - MongoDB Version

A modern course registration and payment system built with React, TypeScript, MongoDB, and Express.

## 🚀 Features

- **Course Registration**: Multiple course types with different pricing
- **Payment Integration**: Razorpay payment gateway integration
- **Admin Dashboard**: Complete admin panel for managing registrations
- **Email Notifications**: Automated confirmation emails
- **Meeting Links**: Manage workshop meeting links
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui
- **Authentication**: JWT-based admin authentication
- **Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for components
- React Router for navigation
- Axios for API calls
- React Hook Form with Zod validation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for emails
- bcryptjs for password hashing
- CORS enabled

### Payment
- Razorpay integration
- Payment verification with webhook support

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Razorpay account
- Gmail account (for sending emails)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd aura-elite-launch-main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/aura-elite

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend API URL
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database will be created automatically

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env`

### 5. Create Admin User

Run the following in your MongoDB shell or MongoDB Compass:

```javascript
use aura-elite
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$10$your-hashed-password", // Use bcrypt to hash
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the provided script:
```bash
node scripts/create-admin.js
```

### 6. Start the development servers

#### Terminal 1 - Backend Server
```bash
npm run dev:server
```

#### Terminal 2 - Frontend Development
```bash
npm run dev
```

### 7. Access the application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin/login

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── integrations/       # API integrations
│   │   └── mongodb/        # MongoDB client and types
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   └── App.tsx             # Main app component
├── server/
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── middleware/         # Express middleware
│   ├── utils/              # Server utilities
│   └── index.js            # Server entry point
├── public/                 # Static assets
└── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/reset-password` - Reset password

### Registrations
- `GET /api/registrations` - Get all registrations (admin)
- `POST /api/registrations` - Create registration
- `GET /api/registrations/:id` - Get registration by ID
- `PUT /api/registrations/:id` - Update registration
- `DELETE /api/registrations/:id` - Delete registration
- `DELETE /api/registrations` - Clear all registrations

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders` - Get all orders (admin)

### Payments
- `POST /api/payments/verify` - Verify payment

### Meeting Links
- `GET /api/meeting-links` - Get all meeting links (admin)
- `GET /api/meeting-links/active` - Get active meeting links
- `POST /api/meeting-links` - Create meeting link
- `PUT /api/meeting-links/:id` - Update meeting link
- `DELETE /api/meeting-links/:id` - Delete meeting link

## 🔐 Authentication

The application uses JWT-based authentication for admin access. Admin users can:

- Login with email/password
- Access protected admin routes
- Manage registrations and meeting links
- View analytics and reports

## 💳 Payment Flow

1. User fills registration form
2. System creates order and registration
3. User redirected to Razorpay payment
4. Payment verification on success
5. Registration status updated
6. Confirmation email sent

## 📧 Email Configuration

The system uses Nodemailer with Gmail. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy the `server/` directory
3. Update `VITE_API_URL` in frontend

## 🔧 Development Scripts

```bash
npm run dev              # Start frontend dev server
npm run dev:server       # Start backend dev server
npm run build            # Build frontend for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`

2. **Payment Verification Fails**
   - Check Razorpay credentials
   - Verify webhook configuration

3. **Email Not Sending**
   - Check Gmail credentials
   - Verify App Password setup

4. **Admin Login Fails**
   - Ensure admin user exists in database
   - Check password hashing

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@example.com or create an issue in the repository.
