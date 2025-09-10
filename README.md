# 🌱 EcoLearn – Gamified Environmental Education Platform  

EcoLearn is a **prototype developed for Smart India Hackathon (SIH 2025)** to make environmental education **fun, engaging, and impactful**.  
The platform combines **quizzes, eco-challenges, badges, and leaderboards** with a **teacher dashboard** for real-world eco-awareness in schools and colleges.  

---

👉 **To see preview, [View Portfolio](https://portfolio-gilt-theta-71.vercel.app/)**  

---

## ✨ Features  
- 🎮 **Gamified Learning** – Interactive quizzes, badges, leaderboards  
- 🌱 **Eco-Challenges** – Plant a tree, save water, avoid plastic (with proof uploads)  
- 🏆 **Leaderboard** – Class/school rankings with rewards  
- 👩‍🏫 **Teacher Dashboard** – Assign challenges, verify proofs, monitor progress  
- 📶 **Offline Support** – Local caching with sync when online  

---

## 🛠 Tech Stack  
- **Frontend:** Kotlin Multiplatform + Jetpack Compose (Android, iOS, Desktop)  
- **Backend:** Kotlin (Ktor Server) + PostgreSQL  
- **Storage & Auth:** Firebase (Authentication + File Storage)  
- **Database:** PostgreSQL (students, quizzes, challenges, leaderboard)  
- **Offline DB:** SQLDelight (local caching)  

---

## 📱 App Flow  

### 👩‍🎓 Student Side  
- Login/Signup (Firebase)  
- Dashboard (Quiz | Challenges | Leaderboard | Profile)  
- Quizzes → Earn XP & badges  
- Challenges → Upload proof → Teacher verifies  
- Leaderboard → Rankings from PostgreSQL  
- Profile → View badges, XP history, progress  

### 👨‍🏫 Teacher/Admin Side  
- Login (JWT admin auth)  
- Dashboard → Student progress overview  
- Assign Challenges → Save to PostgreSQL  
- Verify Proofs → Approve/reject uploads (Firebase + DB)  
- Reports → Export eco-impact stats (CSV/PDF)  

---

## 🚀 Installation & Setup  
```bash
# Clone the repository
git clone https://github.com/your-username/ecolearn.git

# Open with Android Studio / IntelliJ IDEA
# Run shared KMP project for Android/iOS/Desktop
```
---
## 📸 Screens (Prototype)  
- 🏠 Home / Dashboard  
- ❓ Quiz Screen  
- 🌱 Challenges Screen  
- 🏆 Leaderboard  
- 👤 Profile  
- 👩‍🏫 Teacher Dashboard  

---

## 🤝 Contributors  
- **Team Name:** (Add your SIH Team Name)  
- **Problem Statement ID:** SIH25009  
- **Theme:** Smart Education  

---

## 📜 License  
This project is for **SIH 2025 prototype purposes only**.  
