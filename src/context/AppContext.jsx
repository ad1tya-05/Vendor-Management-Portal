import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [vendors, setVendors] = useState([
    {
      id: 'V-001',
      companyName: 'TechCorp Solutions',
      contactName: 'John Doe',
      email: 'john@techcorp.com',
      phone: '+1 234 567 890',
      status: 'Active',
      joinedDate: '2024-01-15',
      docs: ['Tax_Cert.pdf', 'Bank_Details.pdf'],
      rating: 4.5,
      bankDetails: { bankName: 'Global Bank', accountNo: '****5678', ifsc: 'GBL001' }
    },
    {
      id: 'V-002',
      companyName: 'Swift Logistics',
      contactName: 'Jane Smith',
      email: 'jane@swift.com',
      phone: '+1 987 654 321',
      status: 'Pending',
      joinedDate: '2024-05-01',
      docs: ['Business_Reg.pdf'],
      rating: 0,
      bankDetails: { bankName: 'Fast Bank', accountNo: '****1234', ifsc: 'FST002' }
    }
  ]);

  const [products, setProducts] = useState([
    { id: 'P-001', name: 'Industrial Controller', category: 'Electronics', sku: 'IC-4500', price: 299, description: 'Advanced PLC controller', barcode: '123456789012' },
    { id: 'P-002', name: 'Heavy Duty Motor', category: 'Hardware', sku: 'HM-120', price: 1200, description: '3-Phase industrial motor', barcode: '987654321098' }
  ]);

  const [pos, setPos] = useState([
    {
      id: 'PO-5001',
      vendorId: 'V-001',
      vendorName: 'TechCorp Solutions',
      date: '2024-05-05',
      deliveryDate: '2024-05-20',
      status: 'Accepted',
      total: 5000,
      items: [{ productId: 'P-001', name: 'Industrial Controller', qty: 10, rate: 500, amount: 5000 }]
    }
  ]);

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-9001',
      poId: 'PO-5001',
      vendorId: 'V-001',
      vendorName: 'TechCorp Solutions',
      date: '2024-05-10',
      amount: 5000,
      status: 'Pending',
      docUrl: 'invoice_5001.pdf',
      remarks: ''
    }
  ]);

  const [shipments, setShipments] = useState([]);
  const [user, setUser] = useState(null); // { role: 'admin' } or { role: 'vendor', vendorId: 'V-001' }

  // Actions
  const approveVendor = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Active' } : v));
  };

  const rejectVendor = (id, remarks) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Rejected', remarks } : v));
  };

  const updateVendorStatus = (id, status) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: `P-${Math.floor(Math.random() * 1000)}` }]);
  };

  const createPO = (po) => {
    setPos(prev => [...prev, { ...po, id: `PO-${Math.floor(Math.random() * 10000)}`, status: 'Pending' }]);
  };

  const updatePOStatus = (id, status) => {
    setPos(prev => prev.map(po => po.id === id ? { ...po, status } : po));
  };

  const submitInvoice = (invoice) => {
    setInvoices(prev => [...prev, { ...invoice, id: `INV-${Math.floor(Math.random() * 10000)}`, status: 'Pending' }]);
  };

  const approveInvoice = (id) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'Approved' } : inv));
  };

  const rejectInvoice = (id, remarks) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'Rejected', remarks } : inv));
  };

  const addShipment = (shipment) => {
    setShipments(prev => [...prev, { ...shipment, id: `SHP-${Math.floor(Math.random() * 10000)}` }]);
  };

  return (
    <AppContext.Provider value={{
      vendors, setVendors,
      products, setProducts,
      pos, setPos,
      invoices, setInvoices,
      shipments, setShipments,
      user, setUser,
      approveVendor, rejectVendor, updateVendorStatus,
      addProduct, createPO, updatePOStatus,
      submitInvoice, approveInvoice, rejectInvoice,
      addShipment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
