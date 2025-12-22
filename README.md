Project Name: AssetFlow

Purpose: AssetVerse is a Corporate Asset Management System designed to help companies manage their assets efficiently.
The system allows HR managers to control asset inventory and employees to request, receive, and track assigned assets through a secure, role-based platform

Live URL

Frontend (Firebase Hosting):
👉 https://assetsflow-ec37a.web.app

Backend (Vercel):
👉 https://assetverse-backend.vercel.app

Key Features
🔐 Authentication & Authorization

Firebase Authentication
JWT (Firebase ID Token) based secure API
Role-based access control (HR / Employee)

Key Features
🔐 Authentication & Authorization
Firebase Authentication
JWT (Firebase ID Token) based secure API
Role-based access control (HR / Employee)

HR Features

Add, view, and delete company assets
Approve or reject employee asset requests
Automatically decrease available asset quantity upon approval
Manage employee list
Package-based employee limit
Upgrade package via Stripe payment

Dashboard analytics and reports: 
Employee Features
View available assets
Request assets
Track assigned assets
View company team members
Manage personal profile

npm Packages Used
🔸 Frontend: 
react
react-router-dom
@tanstack/react-query
axios
firebase
react-hook-form
sweetalert2
recharts
react-icons
tailwindcss
daisyui

Backend: 
express
cors
mongodb
dotenv
firebase-admin
stripe

Frontend Setup
git clone https://github.com/your-username/assetverse-frontend.git
cd assetverse-frontend
npm install
npm run dev

Backend Setup: 
git clone https://github.com/your-username/assetverse-backend.git
cd assetverse-backend
npm install
npm start



