import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, Send, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POCreation = () => {
  const { vendors, products, createPO, pos } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    vendorId: '',
    deliveryDate: '',
    items: [{ productId: '', qty: 1, rate: 0 }]
  });

  const activeVendors = vendors.filter(v => v.status === 'Active');

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { productId: '', qty: 1, rate: 0 }] });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      newItems[index].rate = product ? product.price : 0;
    }
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const confirmPO = () => {
    const vendor = vendors.find(v => v.id === formData.vendorId);
    const newPO = {
      ...formData,
      vendorName: vendor.companyName,
      date: new Date().toISOString().split('T')[0],
      total: calculateTotal(),
      items: formData.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, name: product.name, amount: item.qty * item.rate };
      })
    };
    createPO(newPO);
    setShowForm(false);
    setShowPreview(false);
    setFormData({ vendorId: '', deliveryDate: '', items: [{ productId: '', qty: 1, rate: 0 }] });
  };

  return (
    <div className="po-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Purchase Orders</h1>
          <p className="text-muted">Generate and track purchase orders sent to vendors.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} /> Create New PO
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Vendor</th>
              <th>Issue Date</th>
              <th>Expected Delivery</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pos.map(po => (
              <tr key={po.id}>
                <td className="font-bold">{po.id}</td>
                <td>{po.vendorName}</td>
                <td>{po.date}</td>
                <td>{po.deliveryDate}</td>
                <td className="font-semibold">${po.total.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${po.status === 'Accepted' ? 'success' : 'warning'}`}>
                    {po.status}
                  </span>
                </td>
                <td><button className="btn btn-ghost btn-sm">View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="modal-overlay">
            <motion.div className="modal-content card max-w-3xl">
              <h3>Create Purchase Order</h3>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="label">Select Vendor</label>
                    <select required className="input" value={formData.vendorId} onChange={e => setFormData({...formData, vendorId: e.target.value})}>
                      <option value="">Choose a vendor...</option>
                      {activeVendors.map(v => <option key={v.id} value={v.id}>{v.companyName}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Delivery Timeline</label>
                    <input required type="date" className="input" value={formData.deliveryDate} onChange={e => setFormData({...formData, deliveryDate: e.target.value})} />
                  </div>
                </div>

                <div className="items-section">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm">Line Items</h4>
                    <button type="button" className="btn btn-ghost btn-sm text-primary" onClick={addItem}><Plus size={14} /> Add Item</button>
                  </div>
                  
                  {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 mb-3 items-end">
                      <div className="col-span-5">
                        <label className="text-xs text-muted mb-1 block">Product</label>
                        <select required className="input" value={item.productId} onChange={e => updateItem(index, 'productId', e.target.value)}>
                          <option value="">Select Product</option>
                          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-muted mb-1 block">Qty</label>
                        <input required type="number" className="input" value={item.qty} min="1" onChange={e => updateItem(index, 'qty', parseInt(e.target.value))} />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-muted mb-1 block">Rate ($)</label>
                        <input required type="number" className="input" value={item.rate} onChange={e => updateItem(index, 'rate', parseFloat(e.target.value))} />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-muted mb-1 block">Amount</label>
                        <div className="p-2 bg-slate-50 rounded text-sm font-bold">${(item.qty * item.rate).toLocaleString()}</div>
                      </div>
                      <div className="col-span-1">
                        <button type="button" className="p-2 text-danger hover:bg-red-50 rounded" onClick={() => removeItem(index)}><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-center border-top pt-4">
                  <div className="text-xl font-bold">Total: ${calculateTotal().toLocaleString()}</div>
                  <div className="flex gap-3">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Preview PO</button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPreview && (
          <div className="modal-overlay">
            <motion.div className="modal-content card max-w-2xl bg-white p-0 overflow-hidden">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                <h3>PO Preview</h3>
                <span className="text-sm opacity-80">Draft Mode</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between mb-8">
                  <div>
                    <h2 className="text-primary">VENDOURIFY</h2>
                    <p className="text-xs text-muted">123 ERP Street, Supply Chain City</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Purchase Order</p>
                    <p className="text-sm">#PO-DRAFT</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="text-xs font-bold text-muted uppercase">Vendor</label>
                  <p className="font-medium text-lg">{vendors.find(v => v.id === formData.vendorId)?.companyName}</p>
                  <p className="text-sm text-muted">Delivery By: {formData.deliveryDate}</p>
                </div>

                <table className="mb-8">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, i) => (
                      <tr key={i}>
                        <td>{products.find(p => p.id === item.productId)?.name}</td>
                        <td>{item.qty}</td>
                        <td>${item.rate}</td>
                        <td className="font-bold">${(item.qty * item.rate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mb-8">
                  <div className="text-right">
                    <p className="text-sm text-muted">Subtotal</p>
                    <p className="text-2xl font-bold">${calculateTotal().toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn btn-secondary flex-1" onClick={() => setShowPreview(false)}>Edit</button>
                  <button className="btn btn-primary flex-1" onClick={confirmPO}><Send size={18} /> Confirm & Send</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100;
        }
        .modal-content { padding: 2rem; width: 90%; max-height: 90vh; overflow-y: auto; }
        .label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--text-muted); }
        .border-top { border-top: 1px solid var(--border); }
        .col-span-5 { grid-column: span 5 / span 5; }
        .col-span-2 { grid-column: span 2 / span 2; }
        .col-span-1 { grid-column: span 1 / span 1; }
      `}</style>
    </div>
  );
};

export default POCreation;
