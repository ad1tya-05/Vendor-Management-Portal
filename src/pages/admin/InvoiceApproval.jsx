import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, Eye, FileText, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceApproval = () => {
  const { invoices, approveInvoice, rejectInvoice } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = (id) => {
    approveInvoice(id);
    setSelectedInvoice(null);
    alert('Invoice approved and payment scheduled. Notification sent to vendor.');
  };

  const handleReject = () => {
    if (!remarks) return alert('Remarks are required for rejection.');
    rejectInvoice(selectedInvoice.id, remarks);
    setIsRejecting(false);
    setSelectedInvoice(null);
    setRemarks('');
    alert('Invoice rejected. Vendor notified with remarks.');
  };

  return (
    <div className="invoice-approval-page">
      <div className="mb-8">
        <h1>Invoice Approval</h1>
        <p className="text-muted">Review invoices submitted by vendors against purchase orders.</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Vendor</th>
              <th>Linked PO</th>
              <th>Amount</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td className="font-medium">{inv.id}</td>
                <td>{inv.vendorName}</td>
                <td className="text-primary font-medium">{inv.poId}</td>
                <td className="font-semibold">${inv.amount.toLocaleString()}</td>
                <td>{inv.date}</td>
                <td>
                  <span className={`badge badge-${inv.status === 'Approved' ? 'success' : inv.status === 'Rejected' ? 'danger' : 'warning'}`}>
                    {inv.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedInvoice(inv)}>
                      <Eye size={16} /> Details
                    </button>
                    {inv.status === 'Pending' && (
                      <>
                        <button className="btn btn-primary btn-sm bg-success" onClick={() => handleApprove(inv.id)}>
                          <Check size={16} />
                        </button>
                        <button className="btn btn-primary btn-sm bg-danger" onClick={() => { setSelectedInvoice(inv); setIsRejecting(true); }}>
                          <X size={16} />
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
        {selectedInvoice && (
          <div className="modal-overlay" onClick={() => { setSelectedInvoice(null); setIsRejecting(false); }}>
            <motion.div className="modal-content card max-w-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3>Invoice Details: {selectedInvoice.id}</h3>
                <button onClick={() => { setSelectedInvoice(null); setIsRejecting(false); }}><X size={20} /></button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-muted">
                  <FileText size={48} className="mb-2" />
                  <p className="text-sm font-medium">invoice_document.pdf</p>
                  <button className="btn btn-ghost text-primary text-xs mt-2">Preview Document</button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">Vendor</label>
                    <p className="font-medium">{selectedInvoice.vendorName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">Amount Payable</label>
                    <p className="text-xl font-bold text-primary">${selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted uppercase">Linked PO</label>
                    <p className="font-medium">{selectedInvoice.poId}</p>
                  </div>
                </div>
              </div>

              {isRejecting ? (
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <h4 className="text-danger mb-2">Rejection Justification</h4>
                  <textarea 
                    className="input mb-4" 
                    rows="3" 
                    placeholder="Provide a reason for rejection..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <button className="btn btn-secondary flex-1" onClick={() => setIsRejecting(false)}>Cancel</button>
                    <button className="btn btn-primary bg-danger flex-1" onClick={handleReject}>Reject Invoice</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  {selectedInvoice.status === 'Pending' ? (
                    <>
                      <button className="btn btn-primary bg-success flex-1" onClick={() => handleApprove(selectedInvoice.id)}>
                        <Check size={18} /> Approve & Process Payment
                      </button>
                      <button className="btn btn-secondary flex-1 text-danger border-danger" onClick={() => setIsRejecting(true)}>
                        <X size={18} /> Reject
                      </button>
                    </>
                  ) : (
                    <div className="w-full p-4 bg-slate-100 rounded text-center text-sm font-medium">
                      This invoice has already been {selectedInvoice.status.toLowerCase()}.
                    </div>
                  )}
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
        .border-danger { border-color: var(--danger); }
        .text-danger { color: var(--danger); }
      `}</style>
    </div>
  );
};

export default InvoiceApproval;
