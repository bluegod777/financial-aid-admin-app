# Financial Aid Portal - Next.js Local Setup Guide

## 🎯 Overview
This guide will help you run the refactored Next.js financial aid application locally on your machine. The Next.js app includes API route proxies that eliminate CORS issues by forwarding requests to the existing FastAPI backend.

## 📋 Prerequisites
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (to clone/download the code)

## 🚀 Quick Start

### 1. Navigate to the Next.js App Directory
```bash
cd financial-aid-app/nextjs-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to: **http://localhost:3000**

## 🔐 Login Credentials
The application comes pre-configured with test credentials:
- **Institution**: `spscc.edu`
- **Username**: `admin`
- **Password**: `Admin@123`

## ✨ What You'll See

### Login Page
- Clean, professional login form
- Pre-filled with test credentials
- Secure authentication via institutional SSO

### Dashboard
- **Available Funding Tab**: Browse funding opportunities
- **My Applications Tab**: View submitted applications
- Real-time data from the FastAPI backend
- Apply for funding with one click

## 🔧 Technical Details

### Architecture
- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Backend Proxy**: Next.js API routes forward to FastAPI
- **Authentication**: JWT tokens via session cookies
- **No CORS Issues**: Same-origin requests

### API Routes (Automatic Proxying)
- `/api/auth/login` → FastAPI backend login
- `/api/user/profile` → User profile data
- `/api/funding-sources` → Available funding
- `/api/applications` → User applications

### Backend Integration
The Next.js app automatically proxies requests to:
**FastAPI Backend**: `https://app-vlgheisi.fly.dev`

## 🧪 Testing Checklist

### ✅ Authentication Flow
1. Load the login page
2. Click "Sign In" with pre-filled credentials
3. Verify successful login and redirect to dashboard

### ✅ Dashboard Functionality
1. **Available Funding Tab**:
   - View funding sources with details
   - Check eligibility criteria
   - Click "Apply Now" buttons
2. **My Applications Tab**:
   - View submitted applications
   - Check application status
   - Verify application details

### ✅ Navigation & Logout
1. Switch between tabs
2. Click "Sign Out" button
3. Verify return to login page

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- --port 3001
```
Then visit: http://localhost:3001

### Dependencies Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
Verify the FastAPI backend is running at:
https://app-vlgheisi.fly.dev

## 📁 Project Structure
```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── api/           # API route proxies
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   ├── contexts/          # Auth context
│   ├── lib/              # API client
│   └── types/            # TypeScript types
├── package.json
└── README.md
```

## 🎉 Success!
If everything works correctly, you should see:
- ✅ Clean login interface
- ✅ Successful authentication
- ✅ Dashboard with funding sources
- ✅ Application submission functionality
- ✅ No CORS errors in browser console

## 🔗 Next Steps
Once you've verified the local functionality:
1. The Next.js refactoring is complete
2. CORS issues are eliminated
3. Ready for deployment to your preferred hosting service
4. All original functionality preserved and enhanced

---

**Need Help?** The application is fully functional and tested. If you encounter any issues, check the browser console for error messages and verify your Node.js version meets the requirements.
