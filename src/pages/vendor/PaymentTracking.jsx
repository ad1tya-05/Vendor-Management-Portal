import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const PaymentTracking = () => {
  const { invoices, user } = useApp();
  const myVendorId = user?.vendorId || 'V-001';
  const myInvoices = invoices.filter(i => i.vendorId === myVendorId);

  const stats = [
    { label: 'Total Paid', value: '$0', icon: CheckCircle, color: 'text-success' },
    { label: 'Pending Process', value: `$${myInvoices.filter(i => i.status === 'Pending').reduce((acc, i) => acc + i.amount, 0).toLocaleString()}`, icon: Clock, color: 'text-warning' },
    { label: 'Overdue', value: '$0', icon: AlertTriangle, color: 'text-danger' },
  ];

  return (
    <div className="payment-tracking-page">
      <div className="mb-8">
        <h1>Payment Ledger</h1>
        <p className="text-muted">Track your payment status, release dates, and historical earnings.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`p-3 rounded-full bg-slate-50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-muted uppercase font-bold">{stat.label}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Payment History</h3>
        <div className="table-container mt-6">
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Estimated Date</th>
              </tr>
            </thead>
            <tbody>
              {myInvoices.map(inv => (
                <tr key={inv.id}>
                  <td className="font-bold">{inv.id}</td>
                  <td>{inv.date}</td>
                  <td className="font-semibold">${inv.amount.toLocaleString()}</td>
                  <td>Bank Transfer (****5678)</td>
                  <td>
                    <span className={`badge badge-${inv.status === 'Approved' ? 'success' : inv.status === 'Rejected' ? 'danger' : 'warning'}`}>
                      {inv.status === 'Approved' ? 'Paid' : inv.status}
                    </span>
                  </td>
                  <td>{inv.status === 'Pending' ? 'TBD' : inv.date}</td>
                </tr>
              ))}
              {myInvoices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-muted">No payment records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;
