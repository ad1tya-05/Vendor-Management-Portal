import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, FileText, CreditCard, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="card flex flex-col justify-between"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="flex items-center gap-1 text-success text-xs font-bold">
        <TrendingUp size={14} />
        {trend}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-muted text-sm font-medium">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const { vendors, pos, invoices } = useApp();

  const stats = [
    { title: 'Total Vendors', value: vendors.length, icon: Users, color: 'bg-primary', trend: '+12%' },
    { title: 'Active POs', value: pos.length, icon: FileText, color: 'bg-accent', trend: '+5%' },
    { title: 'Pending Invoices', value: invoices.filter(i => i.status === 'Pending').length, icon: AlertCircle, color: 'bg-warning', trend: '-2%' },
    { title: 'Payments Released', value: `$${invoices.filter(i => i.status === 'Approved').reduce((acc, i) => acc + i.amount, 0).toLocaleString()}`, icon: CreditCard, color: 'bg-success', trend: '+18%' },
  ];

  return (
    <div className="dashboard-container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Welcome back! Here's what's happening with your vendors.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary">Export Report</button>
          <button className="btn btn-primary">Generate PO</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <DashboardCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3>Recent Purchase Orders</h3>
            <button className="text-primary text-sm font-medium">View All</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>PO ID</th>
                  <th>Vendor</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pos.slice(0, 5).map(po => (
                  <tr key={po.id}>
                    <td className="font-medium">{po.id}</td>
                    <td>{po.vendorName}</td>
                    <td>{po.date}</td>
                    <td>${po.total.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${po.status === 'Accepted' ? 'success' : 'warning'}`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3>Pending Approvals</h3>
            <span className="badge badge-danger">{vendors.filter(v => v.status === 'Pending').length}</span>
          </div>
          <div className="flex flex-col gap-4">
            {vendors.filter(v => v.status === 'Pending').map(v => (
              <div key={v.id} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                  {v.companyName[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{v.companyName}</p>
                  <p className="text-xs text-muted">Applied {v.joinedDate}</p>
                </div>
                <button className="btn btn-ghost p-1"><CheckCircle size={18} className="text-success" /></button>
              </div>
            ))}
            {vendors.filter(v => v.status === 'Pending').length === 0 && (
              <p className="text-center text-muted text-sm py-4">No pending registrations.</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-primary { background-color: var(--primary); }
        .bg-accent { background-color: var(--accent); }
        .bg-warning { background-color: var(--warning); }
        .bg-success { background-color: var(--success); }
        .col-span-2 { grid-column: span 2 / span 2; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
