# Service Review System - Client

A modern, full-featured service review platform built with React, Tailwind CSS, and Firebase Authentication.

## 🌐 Live URL
[Live Demo](https://your-netlify-url.netlify.app)

## 📸 Screenshots

### Home Page
![Home Page](https://i.postimg.cc/m2vT9zMm/screencapture-localhost-5173-2025-12-02-17-26-23.png)

### All Services Page
![All Services](https://i.postimg.cc/k4YmgBqR/screencapture-localhost-5173-services-2025-12-02-17-27-41.png)

### Add Service Page
![Add Service](https://i.postimg.cc/wxPzKywX/screencapture-localhost-5173-add-service-2025-12-02-17-28-25.png)

## 📋 Project Purpose
ServiceReview is a comprehensive platform that allows users to discover, review, and share experiences about various services. Users can add services, post reviews with ratings, and manage their contributions through an intuitive interface.

## ✨ Key Features

### User Authentication
- **Email/Password Registration** with validation (uppercase, lowercase, 6+ characters)
- **Google OAuth** for quick sign-in
- **JWT-based API Security** with HTTP-only cookies
- **Persistent Login** - users stay logged in across sessions

### Service Management
- **Browse All Services** with real-time search and category filtering
- **Add New Services** with comprehensive form
- **Update/Delete Own Services** through intuitive table interface
- **Service Details Page** with full information and reviews

### Review System
- **Add Reviews** with star ratings (using react-rating)
- **Review Confirmation Modal** to prevent accidental submissions
- **Update/Delete Own Reviews** with confirmation modals
- **View All Reviews** for any service
- **My Reviews Page** to manage personal reviews

### UI/UX Features
- **Responsive Design** - works perfectly on mobile, tablet, and desktop
- **Framer Motion Animations** throughout the site
- **Dynamic Page Titles** change based on current route
- **Loading Spinners** for better user experience
- **Toast Notifications** for all CRUD operations
- **Modern Gradient Design** with premium aesthetics
- **404 Page** for invalid routes

### Challenge Features
- **Server-side Search** for better performance and scalability
- **Category Filter** dropdown for refined browsing
- **React CountUp** statistics on homepage
- **Material Tailwind** components for modern UI

## 📦 NPM Packages Used

### Core Dependencies
- `react` & `react-dom` - UI library
- `react-router-dom` - Client-side routing
- `firebase` - Authentication
- `axios` - HTTP requests
- `js-cookie` - Cookie management

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `@material-tailwind/react` - React components
- `@heroicons/react` - Beautiful icons
- `framer-motion` - Smooth animations

### Features
- `react-rating` - Star rating component
- `react-countup` - Animated number counters
- `react-hot-toast` - Toast notifications

### Development
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - Vite React plugin
- `autoprefixer` & `postcss` - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

## 🗂️ Project Structure

```
client/
├── public/
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts (Auth)
│   ├── firebase/        # Firebase configuration
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.local           # Environment variables
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🎨 Design Highlights
- Custom gradient color schemes
- Glassmorphism effects
- Smooth hover animations
- Professional spacing and alignment
- Custom scrollbar styling
- Modern typography (Inter & Outfit fonts)

## 👨‍💻 Developer
Created with ❤️ for PH Assignment 11

## 📄 License
This project is licensed under the MIT License.
