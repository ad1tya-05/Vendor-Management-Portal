import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, MoreVertical, Edit, ShieldAlert, Trash2 } from 'lucide-react';

const VendorManagement = () => {
  const { vendors, updateVendorStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Blacklisted': return 'badge-danger';
      case 'Inactive': return 'badge-info';
      default: return '';
    }
  };

  return (
    <div className="management-page">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1>Vendor Management</h1>
          <p className="text-muted">Maintain your vendor directory and update operational statuses.</p>
        </div>
        <div className="flex gap-4">
          <div className="search-bar flex items-center bg-white border border-border px-3 rounded-md">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search vendors..." 
              className="p-2 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="input w-40" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map(vendor => (
              <tr key={vendor.id}>
                <td className="text-muted font-medium">{vendor.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">
                      {vendor.companyName[0]}
                    </div>
                    <span className="font-semibold">{vendor.companyName}</span>
                  </div>
                </td>
                <td>
                  <p className="text-sm">{vendor.contactName}</p>
                  <p className="text-xs text-muted">{vendor.email}</p>
                </td>
                <td>
                  <span className={`badge ${getStatusBadge(vendor.status)}`}>
                    {vendor.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <span className="text-warning">★</span>
                    <span className="font-medium">{vendor.rating || 'N/A'}</span>
                  </div>
                </td>
                <td>{vendor.joinedDate}</td>
                <td>
                  <div className="flex gap-2">
                    <select 
                      className="text-xs p-1 border rounded"
                      value={vendor.status}
                      onChange={(e) => updateVendorStatus(vendor.id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blacklisted">Blacklisted</option>
                    </select>
                    <button className="p-1 hover:bg-slate-100 rounded"><Edit size={16} className="text-primary" /></button>
                    <button className="p-1 hover:bg-slate-100 rounded"><ShieldAlert size={16} className="text-warning" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorManagement;
