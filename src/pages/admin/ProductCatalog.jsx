import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Search, Barcode as BarcodeIcon, Printer, Download } from 'lucide-react';
import Barcode from 'react-barcode';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCatalog = () => {
  const { products, addProduct } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    sku: '',
    price: '',
    description: '',
    barcode: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    const barcodeValue = newProduct.barcode || Math.floor(Math.random() * 1000000000000).toString();
    addProduct({ ...newProduct, barcode: barcodeValue });
    setShowAddModal(false);
    setNewProduct({ name: '', category: '', sku: '', price: '', description: '', barcode: '' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="catalog-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Product Catalog</h1>
          <p className="text-muted">Manage your product inventory and generate barcodes.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <motion.div 
            key={product.id} 
            whileHover={{ y: -5 }}
            className="card flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="badge badge-info">{product.category}</span>
                <span className="text-xs text-muted font-bold">{product.sku}</span>
              </div>
              <h3 className="mb-2">{product.name}</h3>
              <p className="text-sm text-muted mb-4">{product.description}</p>
              <p className="text-xl font-bold text-primary mb-4">${product.price}</p>
            </div>
            
            <div className="barcode-section bg-slate-50 p-4 rounded-lg flex flex-col items-center">
              <Barcode value={product.barcode} width={1} height={40} fontSize={12} />
              <div className="flex gap-2 mt-3">
                <button className="btn btn-ghost btn-sm" onClick={() => setSelectedProduct(product)}><Printer size={14} /> Print</button>
                <button className="btn btn-ghost btn-sm"><Download size={14} /> Save</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="modal-overlay">
            <motion.div className="modal-content card max-w-lg">
              <h3 className="mb-6">Add New Product</h3>
              <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Product Name</label>
                  <input required className="input" placeholder="e.g. Industrial Sensor" 
                    value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div>
                  <label className="label">Category</label>
                  <input required className="input" placeholder="Electronics" 
                    value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                </div>
                <div>
                  <label className="label">SKU</label>
                  <input required className="input" placeholder="IS-101" 
                    value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} />
                </div>
                <div>
                  <label className="label">Price ($)</label>
                  <input required type="number" className="input" placeholder="99.99" 
                    value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                </div>
                <div>
                  <label className="label">Custom Barcode (Optional)</label>
                  <input className="input" placeholder="Leave empty for auto" 
                    value={newProduct.barcode} onChange={e => setNewProduct({...newProduct, barcode: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="label">Description</label>
                  <textarea className="input" rows="3" 
                    value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                </div>
                <div className="col-span-2 flex gap-3 mt-4">
                  <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary flex-1">Save Product</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <motion.div className="modal-content card max-w-sm text-center" onClick={e => e.stopPropagation()}>
              <h3 className="mb-4">Print Barcode</h3>
              <div className="p-8 bg-white border border-border mb-6">
                <Barcode value={selectedProduct.barcode} />
                <p className="mt-2 font-medium">{selectedProduct.name}</p>
                <p className="text-xs text-muted">{selectedProduct.sku}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-primary flex-1" onClick={handlePrint}>Confirm Print</button>
                <button className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
        }
        .modal-content { padding: 2rem; width: 90%; }
        .label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--text-muted); }
        .col-span-2 { grid-column: span 2 / span 2; }
        .btn-sm { padding: 0.25rem 0.5rem; font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default ProductCatalog;
