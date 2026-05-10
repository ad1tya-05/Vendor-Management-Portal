import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  Truck,
  Barcode
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { user, setUser } = useApp();
  const role = user?.role || 'admin'; // Default to admin for demo if not logged in

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/onboarding', icon: Users, label: 'Onboarding' },
    { to: '/admin/vendors', icon: Users, label: 'Vendors' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/pos', icon: FileText, label: 'Purchase Orders' },
    { to: '/admin/invoices', icon: CreditCard, label: 'Invoices' },
    { to: '/admin/performance', icon: BarChart3, label: 'Performance' },
  ];

  const vendorLinks = [
    { to: '/vendor', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/vendor/pos', icon: FileText, label: 'My POs' },
    { to: '/vendor/shipments', icon: Truck, label: 'Shipments' },
    { to: '/vendor/invoices', icon: CreditCard, label: 'Invoices' },
    { to: '/vendor/barcode', icon: Barcode, label: 'Barcode' },
    { to: '/vendor/payments', icon: CreditCard, label: 'Payments' },
  ];

  const links = role === 'admin' ? adminLinks : vendorLinks;

  return (
    <aside className="sidebar flex flex-col">
      <div className="sidebar-logo">
        <div className="logo-icon">V</div>
        <span>Vendourify</span>
      </div>
      
      <nav className="sidebar-nav flex-1">
        {links.map((link) => (
          <NavLink 
            key={link.to} 
            to={link.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={link.to === '/admin' || link.to === '/vendor'}
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item w-100" onClick={() => setUser(null)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--bg-sidebar);
          color: white;
          padding: 1.5rem 1rem;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 50;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 0.5rem;
          margin-bottom: 2.5rem;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .nav-item.active {
          background: var(--primary);
          color: white;
        }
        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .w-100 { width: 100%; }
      `}</style>
    </aside>
  );
};

export default Sidebar;
