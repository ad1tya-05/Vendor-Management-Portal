import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, TrendingUp, Clock, FileCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const PerformanceCard = ({ vendor }) => {
  const stats = [
    { label: 'On-time Delivery', value: '98%', icon: Clock, color: 'text-success' },
    { label: 'Invoice Accuracy', value: '100%', icon: FileCheck, color: 'text-primary' },
    { label: 'Response Time', value: '2.4h', icon: TrendingUp, color: 'text-accent' },
  ];

  return (
    <motion.div whileHover={{ y: -5 }} className="card">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-lg">
            {vendor.companyName[0]}
          </div>
          <div>
            <h3 className="text-base">{vendor.companyName}</h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map(i => <Star key={i} size={14} className="fill-warning text-warning" />)}
              <Star size={14} className="text-warning" />
              <span className="text-xs font-bold ml-1">{vendor.rating || 4.8}</span>
            </div>
          </div>
        </div>
        <Award className="text-accent" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-3 bg-slate-50 rounded-lg">
            <stat.icon size={18} className={`mx-auto mb-2 ${stat.color}`} />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted uppercase font-bold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted">Fulfillment Score</span>
          <span className="font-bold">92%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-success" style={{ width: '92%' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

const Performance = () => {
  const { vendors } = useApp();
  const activeVendors = vendors.filter(v => v.status === 'Active');

  return (
    <div className="performance-page">
      <div className="mb-8">
        <h1>Vendor Performance</h1>
        <p className="text-muted">Monitor key performance indicators and service level agreements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeVendors.map(vendor => (
          <PerformanceCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6">
        <div className="card">
          <h3>Top Performers (Monthly)</h3>
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted">0{i}</span>
                  <p className="font-medium">Vendor Name {i}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">9.{9-i} Rating</span>
                  <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-success' : 'bg-primary'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Improvement Needed</h3>
          <p className="text-sm text-muted mt-2">Vendors with declining scores in the last 30 days.</p>
          <div className="mt-6 flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl">
            <p className="text-muted text-sm">All vendors are currently meeting SLAs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
