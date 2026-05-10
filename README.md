# Vendor Management Portal – ERP Module

A comprehensive ERP solution for managing vendor operations, purchase orders, shipments, and invoices.

## 🚀 Live Demo
Vercel - https://vendor-management-portal-psi.vercel.app/

## 🛠️ Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Custom CSS with Modern Design System (Glassmorphism, Flex/Grid)
- **State Management:** React Context API
- **Icons:** Lucide-React
- **Animations:** Framer Motion
- **Barcode:** React-Barcode
- **Routing:** React Router v6

## 📋 Features

### Admin Module
- **Dashboard:** KPI tiles for Vendors, POs, Invoices, and Payments.
- **Onboarding Approval:** Review pending registrations with detail modals and rejection remarks.
- **Vendor Management:** Searchable directory with status updates (Active/Inactive/Blacklisted).
- **Product Catalog:** Manage products and generate auto-barcodes.
- **PO Creation:** Multi-item purchase order generation with preview mode.
- **Invoice Approval:** Queue-based approval system with document preview mocks.
- **Performance:** KPI scorecards for vendor delivery and accuracy.

### Vendor Module
- **Account Setup:** Multi-step onboarding form with document upload mock.
- **Dashboard:** Summary of active business operations and quick actions.
- **PO Management:** View, accept, or reject incoming purchase orders.
- **Shipment Handling:** Track and update dispatch details for fulfilled orders.
- **Invoice Submission:** Linked invoice generation against POs with PDF upload.
- **Barcode:** SKU-based barcode generation and printing.
- **Payment Tracking:** Full ledger of paid and pending invoices.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure
```
src/
├── components/      # UI & Layout components
├── context/         # AppContext for global state
├── pages/
│   ├── admin/       # Admin-side screens
│   ├── vendor/      # Vendor-side screens
│   └── Landing.jsx  # Role selection page
└── styles/          # Global styles & variables
```

## 📝 Submission Details
- **Role:** Web Developer
- **Domain:** ERP / Supply Chain
- **Status:** Completed (Mandatory + Good to Have)
