![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750765936/Screenshot_341_kt3ylf.png)

![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750766106/Screenshot_342_sh5ijn.png)

![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750766152/Screenshot_343_pt5s2r.png)

![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750766172/Screenshot_344_th8j09.png)

![](https://res.cloudinary.com/dknw3mf6e/image/upload/v1750766184/Screenshot_345_wss2nq.png)


# 💸 EasyPay – Secure & Seamless Payment Web App

**EasyPay** is a secure, full-stack digital payment platform inspired by apps like Paytm and Google Pay. It enables users to transfer money effortlessly, with real-time transaction handling, user authentication, and a modern, intuitive UI. Built using the **MERN stack** with **TypeScript** throughout, it ensures scalability, maintainability, and type safety.

---

## 🚀 Features

- 🔐 **JWT Authentication & Middleware** – Secure user access with role-based protections.
- 💸 **Send & Receive Money** – Real-time peer-to-peer transfers.
- ⚛️ **Frontend with Vite + React + Tailwind CSS** – Fast builds, responsive UI, smooth UX.
- 🌐 **MongoDB Integration** – Persistent storage of user data and transaction history.
- ✅ **Full TypeScript Stack** – Safer, more predictable code across client and server.
- 🧹 **Code Quality Tools** – ESLint & Prettier with TypeScript config.
- 🔄 **CI/CD Ready** – Setup supports GitHub Actions or Render-based auto-deployments.

---

## 🛠️ Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS |
| **Backend**  | Node.js, Express.js, TypeScript       |
| **Database** | MongoDB + Mongoose                    |
| **Auth**     | JWT, bcrypt                           |
| **Tooling**  | ESLint, Prettier, Husky (optional)     |
| **Deployment** | Render / Vercel / Railway            |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/easypay.git
cd easypay
```

### 2. Install dependencies

If you're using a monorepo structure:

```bash
# Root (if using concurrently setup)
npm install

# Or install separately:
cd client && npm install
cd ../server && npm install
```

### ⚙️ Configuration

Create the following `.env` files:

**server/.env**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

**client/.env**
```
VITE_BACKEND_URL=http://localhost:5000
```

### 🏃 Run the App

**Option 1:** Run both frontend and backend together (if using a proxy setup or concurrently)

```bash
npm run dev
```

**Option 2:** Run backend and frontend separately

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd client
npm run dev
```

### 🔐 Security

- Passwords are hashed using **bcrypt**.
- **JWT tokens** used for authentication.
- Backend routes are protected using custom **authMiddleware**.
- Environment variables stored securely via **.env** files.
- Input validation handled (Zod or middleware) to prevent malicious payloads.

---

## 🌍 Deployment

You can deploy using any of the following:

### Render (Backend + MongoDB):
- Deploy backend by connecting the GitHub repo.
- Add environment variables in Render Dashboard.
- Use Render’s native MongoDB or connect an external DB.

### Vercel / Netlify (Frontend):
- Connect frontend directory (`client`) to Vercel.
- Configure `VITE_BACKEND_URL` in environment settings.

### Railway / Fly.io (Full-stack):
- Can be used to deploy both client and server with a unified CI/CD setup.

---

## 🤝 Contributing

We welcome contributions! Here's how you can contribute:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m 'Added a new feature'
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a Pull Request

Make sure your code follows the **ESLint** and **Prettier** rules configured in the project.

---

## 🧭 Future Improvements

- 🔔 Real-time notifications using WebSockets
- 📱 PWA version for mobile support
- 🧾 Downloadable receipts and transaction history
- 🧑‍💼 Business accounts and analytics dashboard
- 🌐 Multilingual support
