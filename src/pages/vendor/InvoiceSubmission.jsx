import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, FileUp, Send, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceSubmission = () => {
  const { pos, invoices, submitInvoice, user } = useApp();
  const [showModal, setShowModal] = useState(false);
  const myVendorId = user?.vendorId || 'V-001';
  const myPos = pos.filter(p => p.vendorId === myVendorId && p.status === 'Accepted');
  
  const [formData, setFormData] = useState({
    poId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const po = pos.find(p => p.id === formData.poId);
    submitInvoice({
      ...formData,
      vendorId: myVendorId,
      vendorName: 'TechCorp Solutions',
      amount: parseFloat(formData.amount),
      status: 'Pending',
    });
    setShowModal(false);
    setFormData({ poId: '', amount: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="invoice-submission-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Invoice Submission</h1>
          <p className="text-muted">Create and submit invoices against your accepted purchase orders.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Raise Invoice
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>PO Linked</th>
              <th>Submission Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.filter(i => i.vendorId === myVendorId).map(inv => (
              <tr key={inv.id}>
                <td className="font-bold">{inv.id}</td>
                <td className="text-primary font-medium">{inv.poId}</td>
                <td>{inv.date}</td>
                <td className="font-semibold">${inv.amount.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${inv.status === 'Approved' ? 'success' : inv.status === 'Rejected' ? 'danger' : 'warning'}`}>
                    {inv.status}
                  </span>
                </td>
                <td><button className="btn btn-ghost btn-sm">View PDF</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div className="modal-content card max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-primary rounded-lg"><FileText /></div>
                <h3>Create New Invoice</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Link to Purchase Order</label>
                  <select required className="input" value={formData.poId} onChange={e => {
                    const po = myPos.find(p => p.id === e.target.value);
                    setFormData({...formData, poId: e.target.value, amount: po ? po.total : ''});
                  }}>
                    <option value="">Select PO...</option>
                    {myPos.map(po => <option key={po.id} value={po.id}>{po.id} (${po.total.toLocaleString()})</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="label">Invoice Amount ($)</label>
                  <input required type="number" className="input" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                </div>

                <div className="upload-box border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50">
                  <FileUp size={24} className="mx-auto text-muted mb-2" />
                  <p className="text-sm font-medium">Upload Invoice PDF</p>
                  <p className="text-xs text-muted mb-4">Supporting documents and signed copy</p>
                  <button type="button" className="btn btn-secondary btn-sm">Choose File</button>
                </div>

                <div className="flex gap-3 mt-8">
                  <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary flex-1"><Send size={18} /> Submit Invoice</button>
                </div>
              </form>
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
        .label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default InvoiceSubmission;
