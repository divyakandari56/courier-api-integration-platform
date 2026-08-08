# Courier API Integration Platform

A full-stack courier management and API integration platform built with React, Node.js, Express.js, and Microsoft SQL Server.

The platform provides a centralized interface for integrating and interacting with third-party courier services, currently including Delhivery and XpressBees.

---

## 🚀 Features

### 🔐 Authentication
- User login system
- Backend authentication through SQL Server
- Protected application workflow after login

### 🚚 Delhivery Integration
- Delhivery API authentication
- JWT token generation
- Pincode serviceability
- TAT (Turn Around Time) estimation
- Shipment tracking
- POD (Proof of Delivery) download

### 🐝 XpressBees Integration
- Client-based configuration
- XpressBees shipment tracking
- AWB-based tracking
- Parent and Child shipment tracking types
- Client-specific XpressBees API keys stored securely in the database

### 🗄️ Database
- Microsoft SQL Server integration
- Client and credential management
- User authentication data
- Courier-specific configuration

### 🖥️ Admin Dashboard
- Centralized dashboard
- Courier network selection
- Separate interfaces for each courier integration
- API response visualization
- Client selection and shipment tracking

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Axios
- CORS

### Database
- Microsoft SQL Server
- `mssql` Node.js package

### APIs
- Delhivery APIs
- XpressBees APIs

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │      (Vite)          │
                    └──────────┬───────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌──────────────────────┐
                    │   Node.js / Express   │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │  SQL Server     │        │ Courier APIs    │
        │                 │        │                 │
        │ Users           │        │ Delhivery       │
        │ Clients         │        │ XpressBees      │
        │ API Keys        │        │                 │
        └─────────────────┘        └─────────────────┘