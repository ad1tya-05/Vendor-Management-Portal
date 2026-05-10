import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { Package, Search, Printer, Download, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const BarcodePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock vendor products
  const products = [
    { id: 'P-901', name: 'Alloy Steel Pipes', sku: 'ASP-500', barcode: '990123445501' },
    { id: 'P-902', name: 'Industrial Valve', sku: 'IV-22', barcode: '882233445566' },
  ];

  return (
    <div className="barcode-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Product Barcodes</h1>
          <p className="text-muted">Generate and print barcodes for your registered products.</p>
        </div>
        <div className="search-bar flex items-center bg-white border border-border px-3 rounded-md">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="p-2 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <motion.div key={product.id} whileHover={{ y: -5 }} className="card">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-blue-50 text-primary rounded-lg">
                <Package size={24} />
              </div>
              <span className="text-xs font-bold text-muted uppercase">{product.sku}</span>
            </div>
            <h3 className="mb-4">{product.name}</h3>
            
            <div className="bg-white p-4 border border-border rounded-lg flex flex-col items-center">
              <Barcode value={product.barcode} width={1.5} height={50} fontSize={12} />
              <div className="flex gap-2 mt-4 w-full">
                <button className="btn btn-secondary flex-1 btn-sm"><Printer size={14} /> Print</button>
                <button className="btn btn-secondary flex-1 btn-sm"><Download size={14} /> Download</button>
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="card border-dashed border-2 flex flex-col items-center justify-center text-muted cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <Plus size={24} />
          </div>
          <p className="font-medium">Request Barcode</p>
          <p className="text-xs">For new product SKU</p>
        </div>
      </div>

      <style jsx>{`
        .btn-sm { padding: 0.5rem; font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default BarcodePage;
