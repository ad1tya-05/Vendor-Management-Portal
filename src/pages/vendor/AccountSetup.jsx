import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Building2, User, Landmark, FileUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccountSetup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    regNumber: '',
    contactName: '',
    email: '',
    phone: '',
    bankName: '',
    accountNo: '',
    ifsc: '',
    docs: []
  });

  const steps = [
    { id: 1, title: 'Company Details', icon: Building2 },
    { id: 2, title: 'Contact Person', icon: User },
    { id: 3, title: 'Banking & Docs', icon: Landmark },
    { id: 4, title: 'Review & Submit', icon: CheckCircle },
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! Our team will review it within 24-48 hours.');
    navigate('/vendor');
  };

  return (
    <div className="setup-page max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1>Complete Your Business Profile</h1>
        <p className="text-muted mt-2">Let's get you onboarded to the Vendourify ecosystem.</p>
      </div>

      <div className="steps-indicator flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        {steps.map((s) => (
          <div key={s.id} className={`step-item z-10 flex flex-col items-center gap-2 ${step >= s.id ? 'active' : ''}`}>
            <div className={`step-icon w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? 'bg-primary border-primary text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
              <s.icon size={20} />
            </div>
            <span className={`text-xs font-bold ${step >= s.id ? 'text-primary' : 'text-slate-400'}`}>{s.title}</span>
          </div>
        ))}
      </div>

      <div className="card p-8 min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h3 className="mb-6">Business Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="label">Legal Company Name</label>
                  <input className="input" placeholder="e.g. Acme Corp" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                </div>
                <div>
                  <label className="label">Business Registration Number</label>
                  <input className="input" placeholder="GST / VAT / EIN" value={formData.regNumber} onChange={e => setFormData({...formData, regNumber: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="label">Office Address</label>
                  <textarea className="input" rows="3" placeholder="Full business address..."></textarea>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h3 className="mb-6">Contact Representative</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="label">Full Name</label>
                  <input className="input" placeholder="John Doe" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
                </div>
                <div>
                  <label className="label">Job Title</label>
                  <input className="input" placeholder="Sales Manager" />
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <input className="input" type="email" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <input className="input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h3 className="mb-6">Payout Details & Verification</h3>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="label">Bank Name</label>
                  <input className="input" placeholder="Global Trust Bank" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} />
                </div>
                <div>
                  <label className="label">Account Number</label>
                  <input className="input" placeholder="XXXX-XXXX-XXXX" value={formData.accountNo} onChange={e => setFormData({...formData, accountNo: e.target.value})} />
                </div>
              </div>
              
              <div className="upload-section border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50">
                <FileUp size={40} className="mx-auto text-muted mb-4" />
                <h4 className="text-sm font-semibold">Upload Documents</h4>
                <p className="text-xs text-muted mb-4">Upload Business Registration, Tax Certificates, and Bank Proof (PDF/JPG, max 5MB)</p>
                <button className="btn btn-secondary btn-sm">Browse Files</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="step-content text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl mb-2">Ready to Submit!</h3>
              <p className="text-muted mb-8 max-w-md mx-auto">Please review your information carefully. Once submitted, your profile will enter the approval queue.</p>
              
              <div className="text-left bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase">Company</p>
                  <p className="font-semibold">{formData.companyName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase">Contact</p>
                  <p className="font-semibold">{formData.contactName || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-muted font-bold uppercase">Email</p>
                  <p className="font-semibold">{formData.email || 'N/A'}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mt-12 pt-6 border-t">
          <button className={`btn btn-secondary ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`} onClick={handleBack}>
            <ArrowLeft size={18} /> Back
          </button>
          {step < 4 ? (
            <button className="btn btn-primary px-8" onClick={handleNext}>
              Next Step <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary px-12 bg-success" onClick={handleSubmit}>
              Submit Application
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .mx-auto { margin-left: auto; margin-right: auto; }
        .label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--text-muted); }
        .bg-success { background-color: var(--success); }
        .text-success { color: var(--success); }
        .col-span-2 { grid-column: span 2 / span 2; }
      `}</style>
    </div>
  );
};

export default AccountSetup;
