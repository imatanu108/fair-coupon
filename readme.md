Here's an **enhanced `README.md`** with **detailed setup instructions** and an **in-depth explanation of the abuse prevention strategies**:  

---
# 🎟️ Fair Coupon Distribution

A full-stack web application that distributes coupons to guest users **fairly** using a **round-robin** approach while preventing multiple claims through IP and cookie tracking.

## 🚀 Features
- **Fair Distribution**: Coupons are assigned in a sequential manner.
- **Guest Access**: Users can claim coupons without account creation.
- **Abuse Prevention**: Ensures users cannot exploit page refreshes to claim multiple coupons.
- **Real-time Feedback**: Displays messages for successful claims or wait times.

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS  
- **Backend**: Node.js, Express, MongoDB  
- **Database**: MongoDB (Mongoose ORM)  
- **State Management**: React Hooks  
- **Authentication**: Guest-only system with IP & cookie tracking  

---

## 🛠️ Setup Instructions

### **1️⃣ Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in `backend/` and configure MongoDB:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run at **http://localhost:5000**

---

### **2️⃣ Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```
   The frontend will run at **http://localhost:3000**

---

## 🧑‍💻 API Endpoints
| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| `GET`  | `/api/coupons/claim`      | Get an available coupons  |

---

## 🛡️ Abuse Prevention Strategies

To prevent users from exploiting the system to claim multiple coupons unfairly, **two-layer security measures** are implemented:

### **1️⃣ IP Address Tracking**
- Every time a user claims a coupon, their **IP address** is recorded.
- If the same IP tries to claim another coupon within **1 hour**, they receive an error:
  ```json
  { "message": "Try again in X minutes." }
  ```
- **Implementation:**
  ```js
  const users = new Map();

  const preventAbuse = (req, res, next) => {
      const userIP = req.ip;
      const now = Date.now();
      const lastClaim = users.get(userIP);

      if (lastClaim && now - lastClaim < 3600000) {
          const remainingTime = Math.ceil((3600000 - (now - lastClaim)) / 60000);
          return res.status(400).json({ message: `Try again in ${remainingTime} minutes.` });
      }

      users.set(userIP, now);
      next();
  };
  ```
- **Why?**  
  This ensures users cannot claim multiple coupons using the same IP.

---

### **2️⃣ Cookie Tracking**
- A cookie is set when a user successfully claims a coupon:
  ```js
  res.cookie("couponClaimed", true, { maxAge: 3600000, httpOnly: true });
  ```
- If the cookie is present, they cannot claim another coupon for **1 hour**.
- **Why?**  
  This prevents users from bypassing IP tracking by using a VPN or incognito mode.

---

## 🌎 Live Demo
🔗 **[Deployed Link]()**  

---

## 🎯 Future Improvements
✅ **Enhance Abuse Prevention**: Use session storage or fingerprinting.  
✅ **Rate Limiting**: Use Redis to handle abuse at scale.  
✅ **More Coupon Features**: Expiry dates, limited usage per user, etc.  

---

🎯 **Developed with ❤️ using the MERN stack**
```