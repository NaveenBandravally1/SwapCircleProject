# 🚀 SwapCircle Backend

A simple college marketplace backend that allows users to buy, sell, and negotiate items with real-time chat — built as an MVP for a campus exchange platform.

---

## 📌 Overview

SwapCircle solves the problem of unused items (like books, gadgets, etc.) by enabling a secure, private exchange platform without sharing personal contact details.

---

## ✨ Features

### 👤 User System
- Username-based login (no password)
- Stored in browser (localStorage)
- Auto prompt on first visit

---

### 📦 Item Listings
- Add item with:
  - Title
  - Description
  - Price
  - Condition
  - Category
  - Image (drag & drop upload)

- Browse items with:
  - Search (keyword)
  - Filter (category)
  - Sort (price / newest)

- Item display:
  - Thumbnail preview
  - Condition badge

- Item modal:
  - Full description
  - Owner info
  - Image preview

---

### 💰 Offers System
- Buyers can submit price offers
- Sellers can:
  - Accept
  - Reject

- Offer status:
  PENDING → ACCEPTED / REJECTED

- Bug Fix:
  Fixed issue where offer amount was not displaying (field mismatch)

---

### 💬 In-App Chat
- Real-time chat between buyer & seller
- Chat per item
- Polling every 3 seconds
- No external apps required

---

### 🖼️ Image Upload
- Drag & drop upload
- Stored locally:
  ~/swapcircle-uploads/

---

### 📄 Static Pages
- Home
  - Hero section
  - Category shortcuts
  - Latest listings
  - How It Works

- Services
  - 6 categories display

- Contact
  - Frontend form (no backend email support)

---

## ⚠️ Limitations (MVP Stage)

- No database (data stored in-memory, resets on restart)
- No authentication (any username allowed)
- No notifications (no alerts for chat or offers)
- Contact form not functional (no email integration)

---

## 🛠️ Tech Stack

- Backend: (Add your stack here, e.g., Node.js / Spring Boot)
- Storage: Local filesystem
- Communication: Polling-based chat

---

## 📂 Project Structure
