⭐ If you find this project helpful, please give it a star!

# SIGMA GPT – MERN Stack Chat Application 🚀

[![GitHub stars](https://img.shields.io/github/stars/k-vaishnav/SIGMA-GPT?style=social)](https://github.com/k-vaishnav/SIGMA-GPT/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/k-vaishnav/SIGMA-GPT?style=social)](https://github.com/k-vaishnav/SIGMA-GPT/network)
[![GitHub issues](https://img.shields.io/github/issues/k-vaishnav/SIGMA-GPT)](https://github.com/k-vaishnav/SIGMA-GPT/issues)
[![License](https://img.shields.io/github/license/k-vaishnav/SIGMA-GPT)](https://github.com/k-vaishnav/SIGMA-GPT/blob/main/LICENSE)

## 🚀 Sigma GPT

**Sigma GPT** is a full-stack AI chat application inspired by ChatGPT. It allows users to create multiple chat threads, continue conversations seamlessly, and view chat history in real time with a clean and modern UI.

## 🎯 Why this project matters:
Sigma GPT demonstrates real-world frontend + backend integration, scalable state management, API design, and authentication—making it a strong portfolio project for Frontend Engineer, Full-Stack Developer, and Software Engineer roles.

🌐 Live Demo: https://sigma-gpt-one.vercel.app/
⚠️ Note: Backend is hosted on Render free tier — initial requests may take 20–30 seconds.

## 🔍 Quick Demo
- Create an account and log in
- Start a new chat thread
- Ask a question and receive AI responses
- Switch between threads using the sidebar

## 🧠 Problem Statement

Modern AI chat applications require:

- Scalable conversation handling
- Secure user authentication
- Clean separation of frontend and backend logic
- Maintainable and extensible architecture

Sigma GPT addresses these challenges by implementing thread-based conversations, JWT-secured APIs, and a modular MERN architecture suitable for future extensions.

## ✨ Features

### 👤 Authentication & Security
- Secure user registration & login
- JWT-based authentication
- Password hashing with **bcrypt**
- Protected routes using middleware
### 💬 Chat & Threads
- Create and manage multiple chat threads
- Sidebar dynamically updates based on latest replies
- Persistent conversations stored in MongoDB
- Clean separation of threads and messages
### 🧠 AI Integration
- AI-powered responses using OpenAI API
- Async request handling with proper loading states
- Error-safe API calls
### 🎨 UI & UX
- Responsive and minimal UI
- Smooth chat experience
- Component-based architecture
- Scalable global state using Context API

## 🛠 Tech Stack

**Frontend**
- React(Vite)
- Context API
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

**Other**
- OpenAI API
- Axios
- UUID

  ## 📂 Project Structure

  Sigma-GPT/
├── client/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── services/
├── server/
│   ├── models/
|   ├── utils/
│   ├── routes/
│   ├── controllers/
│   └── middlewares/
└── README.md

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```
git clone https://github.com/k-vaishnav/SIGMA-GPT.git
cd sigma-gpt

```
### 2️⃣ Install dependencies

**Frontend**
```
cd client
npm install

```
**Backend**
```
cd server
npm install

```
### 3️⃣ Environment Variables
Create a ```.env``` file inside the server directory:
```
env

PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Application
**Backend**
```
npm run start
```
**Frontend**
```
npm run dev
```

### 🧠 What I Learned
- Designing scalable React state using Context API
- Implementing secure JWT authentication
- Structuring a production-ready MERN application
- Managing async AI API calls and error handling


## 🚧 Planned Enhancements (Open-Source Friendly)

These improvements are intentionally listed to encourage contributions and long-term maintenance.

- Streaming AI responses (token-by-token)
- Guest user chat persistence
- Better URL-based thread navigation
- Improved error boundaries and logging
- Test coverage (unit + integration tests)
  
### 👨‍💻 Author

**Vaishnav Komal**
Full-Stack Developer (MERN) | 2025 B.Tech Graduate
GitHub: https://github.com/k-vaishnav

### ⭐ Final Note for Recruiters

Sigma GPT is built with production-style architecture, focusing on:
  - Clean code
  - Scalable structure
  - Real-world authentication & API patterns

If you’re reviewing this project as part of a hiring process, I’d love to discuss the design decisions, trade-offs, and improvements in detail.

## 🤝 Contributing

Pull requests are welcome!
If you like this project, consider giving it a ⭐

## 📄 License

MIT License
