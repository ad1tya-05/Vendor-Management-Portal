import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Truck, CreditCard, Clock, PlusCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  const { pos, invoices, user, vendors } = useApp();
  const myVendorId = user?.vendorId || 'V-001';
  const myPos = pos.filter(p => p.vendorId === myVendorId);
  const myInvoices = invoices.filter(i => i.vendorId === myVendorId);
  const myData = vendors.find(v => v.id === myVendorId);

  const stats = [
    { title: 'Total POs', value: myPos.length, icon: FileText, color: 'bg-primary' },
    { title: 'Pending Invoices', value: myInvoices.filter(i => i.status === 'Pending').length, icon: Clock, color: 'bg-warning' },
    { title: 'In Transit', value: '0', icon: Truck, color: 'bg-info' },
    { title: 'Payments Due', value: `$${myInvoices.filter(i => i.status === 'Pending').reduce((acc, i) => acc + i.amount, 0).toLocaleString()}`, icon: CreditCard, color: 'bg-danger' },
  ];

  return (
    <div className="vendor-dashboard">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Vendor Portal</h1>
          <p className="text-muted">Hello, {myData?.companyName || 'Vendor'}. Here's your business summary.</p>
        </div>
        {myData?.status === 'Pending' && (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">Account Pending Approval</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="card">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-white mb-4`}>
              <stat.icon size={20} />
            </div>
            <p className="text-sm text-muted font-medium">{stat.title}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3>Recent Purchase Orders</h3>
            <Link to="/vendor/pos" className="text-primary text-sm font-medium flex items-center gap-1">
              View All <ExternalLink size={14} />
            </Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>PO ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myPos.slice(0, 5).map(po => (
                  <tr key={po.id}>
                    <td className="font-bold">{po.id}</td>
                    <td>{po.date}</td>
                    <td className="font-semibold">${po.total.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${po.status === 'Accepted' ? 'success' : 'warning'}`}>
                        {po.status}
                      </span>
                    </td>
                    <td>
                      <Link to="/vendor/pos" className="btn btn-ghost btn-sm text-primary">Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card">
            <h3>Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3 mt-4">
              <Link to="/vendor/invoices" className="btn btn-primary w-full justify-start">
                <PlusCircle size={18} /> Raise New Invoice
              </Link>
              <Link to="/vendor/shipments" className="btn btn-secondary w-full justify-start">
                <Truck size={18} /> Update Shipment
              </Link>
              <Link to="/vendor/barcode" className="btn btn-secondary w-full justify-start">
                <PlusCircle size={18} /> Product Barcodes
              </Link>
            </div>
          </div>

          <div className="card bg-slate-900 text-white">
            <h3 className="text-white mb-2">Support & Help</h3>
            <p className="text-xs text-slate-400 mb-4">Need help with an order or technical issue? Contact our admin team.</p>
            <button className="btn btn-primary w-full bg-slate-700 hover:bg-slate-600 border-none">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-primary { background-color: var(--primary); }
        .bg-warning { background-color: var(--warning); }
        .bg-info { background-color: var(--info); }
        .bg-danger { background-color: var(--danger); }
        .col-span-2 { grid-column: span 2 / span 2; }
      `}</style>
    </div>
  );
};

export default VendorDashboard;
