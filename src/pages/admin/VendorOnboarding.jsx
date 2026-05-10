import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Check, X, FileText, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VendorOnboarding = () => {
  const { vendors, approveVendor, rejectVendor } = useApp();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const pendingVendors = vendors.filter(v => v.status === 'Pending');

  const handleApprove = (id) => {
    approveVendor(id);
    setSelectedVendor(null);
  };

  const handleReject = () => {
    if (!remarks) return alert('Please provide remarks for rejection');
    rejectVendor(selectedVendor.id, remarks);
    setShowRejectModal(false);
    setSelectedVendor(null);
    setRemarks('');
  };

  return (
    <div className="onboarding-page">
      <div className="mb-8">
        <h1>Vendor Onboarding Approval</h1>
        <p className="text-muted">Review and approve new vendor registration requests.</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact Name</th>
              <th>Email</th>
              <th>Date Applied</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingVendors.map(vendor => (
              <tr key={vendor.id}>
                <td className="font-medium">{vendor.companyName}</td>
                <td>{vendor.contactName}</td>
                <td>{vendor.email}</td>
                <td>{vendor.joinedDate}</td>
                <td>
                  <div className="flex gap-1">
                    {vendor.docs.map((doc, i) => (
                      <span key={i} className="badge badge-info text-xs flex items-center gap-1">
                        <FileText size={12} /> {doc}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedVendor(vendor)}>
                      <Eye size={16} /> View
                    </button>
                    <button className="btn btn-primary btn-sm" style={{ background: 'var(--success)' }} onClick={() => handleApprove(vendor.id)}>
                      <Check size={16} /> Approve
                    </button>
                    <button className="btn btn-primary btn-sm" style={{ background: 'var(--danger)' }} onClick={() => { setSelectedVendor(vendor); setShowRejectModal(true); }}>
                      <X size={16} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pendingVendors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-muted">No pending requests.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVendor && !showRejectModal && (
          <div className="modal-overlay" onClick={() => setSelectedVendor(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content card"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3>Vendor Details</h3>
                <button onClick={() => setSelectedVendor(null)}><X size={20} /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="detail-group">
                  <label className="text-xs text-muted uppercase font-bold">Company Name</label>
                  <p className="font-medium">{selectedVendor.companyName}</p>
                </div>
                <div className="detail-group">
                  <label className="text-xs text-muted uppercase font-bold">Contact Name</label>
                  <p className="font-medium">{selectedVendor.contactName}</p>
                </div>
                <div className="detail-group">
                  <label className="text-xs text-muted uppercase font-bold">Email Address</label>
                  <p className="font-medium">{selectedVendor.email}</p>
                </div>
                <div className="detail-group">
                  <label className="text-xs text-muted uppercase font-bold">Phone</label>
                  <p className="font-medium">{selectedVendor.phone}</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="mb-3 text-sm">Bank Details</h4>
                <div className="bg-slate-50 p-4 rounded-lg flex justify-between">
                  <div>
                    <label className="text-xs text-muted uppercase">Bank Name</label>
                    <p className="text-sm font-medium">{selectedVendor.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted uppercase">Account No</label>
                    <p className="text-sm font-medium">{selectedVendor.bankDetails.accountNo}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted uppercase">IFSC Code</label>
                    <p className="text-sm font-medium">{selectedVendor.bankDetails.ifsc}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="btn btn-primary flex-1" style={{ background: 'var(--success)' }} onClick={() => handleApprove(selectedVendor.id)}>Approve Vendor</button>
                <button className="btn btn-secondary flex-1" onClick={() => setShowRejectModal(true)}>Reject with Remarks</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <div className="modal-overlay">
            <motion.div className="modal-content card max-w-md">
              <h3>Rejection Remarks</h3>
              <p className="text-sm text-muted mb-4">Please provide a reason for rejecting {selectedVendor?.companyName}.</p>
              <textarea 
                className="input mb-4" 
                rows="4" 
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
              <div className="flex gap-2">
                <button className="btn btn-secondary flex-1" onClick={() => setShowRejectModal(false)}>Cancel</button>
                <button className="btn btn-primary flex-1 bg-danger" onClick={handleReject}>Confirm Reject</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal-content {
          width: 90%;
          max-width: 600px;
          padding: 2rem;
        }
        .bg-danger { background-color: var(--danger); }
        .btn-sm { padding: 0.375rem 0.75rem; font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default VendorOnboarding;
