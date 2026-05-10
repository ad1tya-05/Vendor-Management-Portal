import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Store, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleRoleSelect = (role) => {
    if (role === 'admin') {
      setUser({ role: 'admin', name: 'Admin User' });
      navigate('/admin');
    } else {
      setUser({ role: 'vendor', name: 'TechCorp Solutions', vendorId: 'V-001' });
      navigate('/vendor');
    }
  };

  return (
    <div className="landing-page flex items-center justify-center">
      <div className="landing-content text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Seamless <span className="gradient-text">Vendor Ecosystem</span>
          </h1>
          <p className="text-muted text-xl max-w-2xl mx-auto leading-relaxed">
            Empower your supply chain with Vendourify. The complete ERP suite for 
            <span className="text-primary font-medium"> smart onboarding</span>, 
            <span className="text-primary font-medium"> automated POs</span>, and 
            <span className="text-primary font-medium"> real-time tracking</span>.
          </p>
        </motion.div>

        <div className="role-cards grid grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="role-card admin card flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => handleRoleSelect('admin')}
          >
            <div className="icon-wrapper admin-bg">
              <ShieldCheck size={48} />
            </div>
            <h3>Admin Portal</h3>
            <p className="text-sm text-muted text-center">Manage vendors, approve invoices, create POs and track performance.</p>
            <div className="btn btn-primary w-full mt-4">
              Enter as Admin <ArrowRight size={18} />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="role-card vendor card flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => handleRoleSelect('vendor')}
          >
            <div className="icon-wrapper vendor-bg">
              <Store size={48} />
            </div>
            <h3>Vendor Portal</h3>
            <p className="text-sm text-muted text-center">View POs, submit invoices, track shipments and manage your profile.</p>
            <div className="btn btn-primary w-full mt-4">
              Enter as Vendor <ArrowRight size={18} />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 2rem;
        }
        .landing-content {
          max-width: 900px;
          width: 100%;
        }
        .role-card {
          padding: 3rem 2rem;
          background: white;
          border: 1px solid var(--border);
        }
        .icon-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .admin-bg { background: #dbeafe; color: var(--primary); }
        .vendor-bg { background: #fef3c7; color: var(--accent); }
        .w-full { width: 100%; }
        .text-5xl { font-size: 3.5rem; }
        .text-xl { font-size: 1.25rem; }
        .tracking-tight { letter-spacing: -0.025em; }
        .leading-relaxed { line-height: 1.625; }
        .max-w-2xl { max-width: 42rem; }
        .font-extrabold { font-weight: 800; }
        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .mb-12 { margin-bottom: 4rem; }
        .mb-6 { margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
};

export default Landing;
