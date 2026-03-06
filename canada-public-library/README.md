# 🏛️ Canada Public Library

A comprehensive digital library platform built with the MERN stack, providing access to books, catalog search, and reading events across Canada.

## 🌐 Live Website

**Visit the live application:** [https://canada-public-library-app.vercel.app/](https://canada-public-library-app.vercel.app/)

## ✨ Features

- **📚 Catalog Search**: Search for books by title, author, and location
- **📅 Reading Events**: Find literary events and book clubs near you
- **🔐 User Authentication**: Register and login to access personalized features
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations
- **💡 Smart Suggestions**: Auto-complete for book titles and authors

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Framer Motion (animations)
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose (with JSON fallback)
- Axios
- Cheerio (web scraping)
- CORS

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AnuragRocks/CanadaPublicLibrary.git
cd CanadaPublicLibrary
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running Locally

1. Start the backend server:
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

3. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
CanadaPublicLibrary/
├── backend/
│   ├── index.js          # Main backend server
│   ├── package.json
│   ├── db.json          # JSON database fallback
│   └── locations.json   # Location cache
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main App component
│   └── package.json
└── README.md
```

## 🌟 Key Pages

- **Home**: Landing page with hero section and features
- **Catalog Search**: Search and discover books
- **Events**: Find reading events by location
- **About Us**: Learn about the library
- **Login/Register**: User authentication

## 👨‍💻 Developer

**Anurag Sharma**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/anurag-sharma-82b746220/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
