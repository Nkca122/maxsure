# MAXSURE

_Empowering Innovation, Elevating Possibilities Daily_

[![Last Commit](https://img.shields.io/badge/last%20commit-last%20sunday-lightgrey?style=flat&logo=git)]()
[![TypeScript](https://img.shields.io/badge/typescript-82.6%25-blue?logo=typescript)]()
[![Languages](https://img.shields.io/badge/languages-4-blue?style=flat)]()

---

## 🚀 Built With

![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-black?logo=json&logoColor=white)
![npm](https://img.shields.io/badge/npm-red?logo=npm&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-800000?logo=mongoose&logoColor=white)
![DotEnv](https://img.shields.io/badge/.ENV-yellow?logo=dotenv&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=black)
![Passport](https://img.shields.io/badge/Passport-green?logo=passport&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-blueviolet)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-purple?logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-pink?logo=reacthookform&logoColor=white)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Project](#running-the-project)

---

## 🧩 Overview

**Maxsure** is a full-stack platform engineered for modern AI-powered trading and secure user interactions. Featuring a dynamic frontend and a robust backend, Maxsure is developer-focused, scalable, and production-ready.

### 🌟 Core Features

- ⚛️ **React + Vite** for blazing-fast front-end development
- 💡 **Reusable UI Components** for a consistent user experience
- 🔐 **JWT Authentication** for secure access control
- 🤖 **Telegram Bot Integration** with GPT-4 for interactive communication
- 📦 **Modular Backend** with Express, Mongoose, and environment-based configs

---

## 🛠 Getting Started

### ✅ Prerequisites

Ensure the following are installed:

- **Node.js** (>= v16)
- **npm** (>= v8)
- **MongoDB Atlas/local instance**
- **Git**

---

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nkca122/maxsure
   cd maxsure

   ```

2. **Installing Dependencies:**

   ```bash
   cd backend; npm install; cd ../frontend; npm install;

   ```

3. **Create .env files in `/backend` & `/frontend`:**

   > `/frontend/.env`

   ```bash
    VITE_BACKEND_URL= http://localhost:3000 # Your Base url for the backend / server
    VITE_BOT_URL= <SOURCE_OF_THE_QR_CODE_FOR_YOUR_BOT>
   ```

   > `/backend/.env`

   ```bash
   PORT= 3000
   MONGO_URI= <YOUR_MONGODB_CONNECTION_STRING>
   JWT_SECRET= <YOUR_JWT_SECRET>
   TELEGRAM_URL= https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>

   OPENAI_TOKEN= <YOUR_OPENAI_API_TOKEN>

   PREMIUM_USER= "Welcome! To Algo brief" #Message sent by bot when user is registered

   REGISTER_USER='
   You are not a registered user please register at
   https://www.youtube.com/
   ' # Message Sent by bot if the telegram username is not registered

   ASSISTANT_PROMPT= "This system is an AI assistant which explains all the terms mentioned in the prompt as humanly as possible" #The prompt can be changed accordingly
   REPORTS_PER_PAGE=2 # Changing this requires changes in the frontend

   ENV= development # Change it to PRODUCTION in production and add a key CLIENT= with the value consisting of the url to the client/frontend
   ```
5. **Setup the webhooks:**
    > **NOTE:** The webhook to receive the market updates should provide data in the data format **text/plain**

   ```bash
   ngrok http 3000
   ```
    > Copy the link for `forwarding` & Run the command below

    ```bash
    curl -F "url=<FORWARDING_LINK>/bot/new-message" https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook
    ```

    untill 
    ```bash
    {
        "ok":true,
        "result":true,
        ...
    }
    ```



5. **Start the backend:**

   ```bash
   cd backend
   node index.js

   ```

6. **Start the Client:**

   ```bash
   cd frontend
   npm run dev
   ```
