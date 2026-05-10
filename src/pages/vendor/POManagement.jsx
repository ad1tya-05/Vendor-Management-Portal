import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Check, X, Eye, Printer, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POManagement = () => {
  const { pos, user, updatePOStatus } = useApp();
  const [selectedPO, setSelectedPO] = useState(null);
  const myVendorId = user?.vendorId || 'V-001';
  const myPos = pos.filter(p => p.vendorId === myVendorId);

  const handleStatusUpdate = (id, status) => {
    updatePOStatus(id, status);
    setSelectedPO(null);
  };

  return (
    <div className="po-mgmt-page">
      <div className="mb-8">
        <h1>Purchase Order Management</h1>
        <p className="text-muted">View, accept, and process purchase orders from the administration.</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Issue Date</th>
              <th>Delivery Timeline</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPos.map(po => (
              <tr key={po.id}>
                <td className="font-bold">{po.id}</td>
                <td>{po.date}</td>
                <td>{po.deliveryDate}</td>
                <td>{po.items.length} Product(s)</td>
                <td className="font-semibold">${po.total.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${po.status === 'Accepted' ? 'success' : po.status === 'Rejected' ? 'danger' : 'warning'}`}>
                    {po.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedPO(po)}>
                      <Eye size={16} /> Details
                    </button>
                    {po.status === 'Pending' && (
                      <>
                        <button className="btn btn-primary btn-sm bg-success" onClick={() => handleStatusUpdate(po.id, 'Accepted')}>
                          <Check size={16} /> Accept
                        </button>
                        <button className="btn btn-primary btn-sm bg-danger" onClick={() => handleStatusUpdate(po.id, 'Rejected')}>
                          <X size={16} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedPO && (
          <div className="modal-overlay" onClick={() => setSelectedPO(null)}>
            <motion.div className="modal-content card max-w-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3>PO Details: {selectedPO.id}</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded"><Printer size={18} /></button>
                  <button className="p-2 hover:bg-slate-100 rounded" onClick={() => setSelectedPO(null)}><X size={20} /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8 border-b pb-8">
                <div>
                  <label className="text-xs font-bold text-muted uppercase">Issuer</label>
                  <p className="font-medium">Vendourify Admin HQ</p>
                  <p className="text-sm text-muted">123 ERP Street, City</p>
                </div>
                <div className="text-right">
                  <label className="text-xs font-bold text-muted uppercase">Expected By</label>
                  <p className="font-bold text-lg text-primary">{selectedPO.deliveryDate}</p>
                </div>
              </div>

              <table className="mb-8">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPO.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>${item.rate}</td>
                      <td className="font-bold">${item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-8">
                <div className="text-right">
                  <p className="text-sm text-muted mb-1">Grand Total</p>
                  <p className="text-3xl font-bold text-slate-900">${selectedPO.total.toLocaleString()}</p>
                </div>
              </div>

              {selectedPO.status === 'Pending' ? (
                <div className="flex gap-3">
                  <button className="btn btn-primary bg-success flex-1" onClick={() => handleStatusUpdate(selectedPO.id, 'Accepted')}>
                    <Check size={18} /> Accept Order
                  </button>
                  <button className="btn btn-secondary flex-1 text-danger border-danger" onClick={() => handleStatusUpdate(selectedPO.id, 'Rejected')}>
                    <X size={18} /> Reject Order
                  </button>
                </div>
              ) : (
                <div className="w-full p-4 bg-slate-100 rounded text-center text-sm font-medium">
                  Order status: <span className="font-bold">{selectedPO.status}</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100;
        }
        .modal-content { padding: 2.5rem; width: 90%; }
        .bg-success { background-color: var(--success); }
        .bg-danger { background-color: var(--danger); }
        .text-danger { color: var(--danger); }
        .border-danger { border-color: var(--danger); }
      `}</style>
    </div>
  );
};

export default POManagement;
