import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, Package, Calendar, MapPin, Plus, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShipmentHandling = () => {
  const { pos, shipments, addShipment, user } = useApp();
  const [showModal, setShowModal] = useState(false);
  const myVendorId = user?.vendorId || 'V-001';
  const acceptedPos = pos.filter(p => p.vendorId === myVendorId && p.status === 'Accepted');
  
  const [formData, setFormData] = useState({
    poId: '',
    trackingNo: '',
    courier: '',
    dispatchDate: '',
    eta: '',
    status: 'In Transit'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addShipment({ ...formData, id: `SHP-${Math.floor(Math.random() * 10000)}` });
    setShowModal(false);
    setFormData({ poId: '', trackingNo: '', courier: '', dispatchDate: '', eta: '', status: 'In Transit' });
  };

  return (
    <div className="shipment-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Shipment Handling</h1>
          <p className="text-muted">Track and update dispatch status for your fulfilled purchase orders.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Update Shipment
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="card bg-primary text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-100 uppercase font-bold mb-1">Active Shipments</p>
              <h2 className="text-3xl font-bold">{shipments.length}</h2>
            </div>
            <Truck size={32} className="opacity-50" />
          </div>
        </div>
        <div className="card">
          <p className="text-xs text-muted uppercase font-bold mb-1">Delivered (This Month)</p>
          <h2 className="text-3xl font-bold">12</h2>
        </div>
        <div className="card">
          <p className="text-xs text-muted uppercase font-bold mb-1">Avg. Dispatch Time</p>
          <h2 className="text-3xl font-bold">1.8 Days</h2>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <History size={20} className="text-primary" />
          <h3>Shipment History Log</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>PO ID</th>
                <th>Tracking #</th>
                <th>Courier</th>
                <th>Dispatch Date</th>
                <th>ETA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length > 0 ? shipments.map(shp => (
                <tr key={shp.id}>
                  <td className="font-bold">{shp.id}</td>
                  <td className="text-primary font-medium">{shp.poId}</td>
                  <td className="text-sm">{shp.trackingNo}</td>
                  <td>{shp.courier}</td>
                  <td>{shp.dispatchDate}</td>
                  <td>{shp.eta}</td>
                  <td>
                    <span className="badge badge-info">{shp.status}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-muted">No shipments logged yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div className="modal-content card max-w-lg">
              <h3 className="mb-6">Update Shipment Details</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Link to Purchase Order</label>
                  <select required className="input" value={formData.poId} onChange={e => setFormData({...formData, poId: e.target.value})}>
                    <option value="">Select an accepted PO</option>
                    {acceptedPos.map(po => <option key={po.id} value={po.id}>{po.id} (${po.total})</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Tracking Number</label>
                  <input required className="input" placeholder="e.g. TRK900123" value={formData.trackingNo} onChange={e => setFormData({...formData, trackingNo: e.target.value})} />
                </div>
                <div>
                  <label className="label">Courier Service</label>
                  <input required className="input" placeholder="FedEx / DHL" value={formData.courier} onChange={e => setFormData({...formData, courier: e.target.value})} />
                </div>
                <div>
                  <label className="label">Dispatch Date</label>
                  <input required type="date" className="input" value={formData.dispatchDate} onChange={e => setFormData({...formData, dispatchDate: e.target.value})} />
                </div>
                <div>
                  <label className="label">Estimated Delivery (ETA)</label>
                  <input required type="date" className="input" value={formData.eta} onChange={e => setFormData({...formData, eta: e.target.value})} />
                </div>
                <div className="col-span-2 flex gap-3 mt-6">
                  <button type="button" className="btn btn-secondary flex-1" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary flex-1">Confirm Dispatch</button>
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
        .modal-content { padding: 2rem; width: 90%; }
        .label { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--text-muted); }
        .col-span-2 { grid-column: span 2 / span 2; }
      `}</style>
    </div>
  );
};

export default ShipmentHandling;
