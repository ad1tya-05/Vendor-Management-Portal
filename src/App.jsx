import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import VendorOnboarding from './pages/admin/VendorOnboarding';
import VendorManagement from './pages/admin/VendorManagement';
import ProductCatalog from './pages/admin/ProductCatalog';
import POCreation from './pages/admin/POCreation';
import InvoiceApproval from './pages/admin/InvoiceApproval';
import Performance from './pages/admin/Performance';

// Vendor Pages
import VendorDashboard from './pages/vendor/Dashboard';
import POManagement from './pages/vendor/POManagement';
import ShipmentHandling from './pages/vendor/ShipmentHandling';
import InvoiceSubmission from './pages/vendor/InvoiceSubmission';
import PaymentTracking from './pages/vendor/PaymentTracking';
import BarcodePage from './pages/vendor/BarcodePage';
import AccountSetup from './pages/vendor/AccountSetup';

// Auth/Landing
import Landing from './pages/Landing';

const AppRoutes = () => {
  const { user } = useApp();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/onboarding" element={<VendorOnboarding />} />
              <Route path="/vendors" element={<VendorManagement />} />
              <Route path="/products" element={<ProductCatalog />} />
              <Route path="/pos" element={<POCreation />} />
              <Route path="/invoices" element={<InvoiceApproval />} />
              <Route path="/performance" element={<Performance />} />
            </Routes>
          </MainLayout>
        } />

        {/* Vendor Routes */}
        <Route path="/vendor/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<VendorDashboard />} />
              <Route path="/setup" element={<AccountSetup />} />
              <Route path="/pos" element={<POManagement />} />
              <Route path="/shipments" element={<ShipmentHandling />} />
              <Route path="/invoices" element={<InvoiceSubmission />} />
              <Route path="/barcode" element={<BarcodePage />} />
              <Route path="/payments" element={<PaymentTracking />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
