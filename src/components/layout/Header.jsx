import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { user } = useApp();
  const roleName = user?.role === 'admin' ? 'Administrator' : 'Vendor Portal';

  return (
    <header className="header flex items-center justify-between glass">
      <div className="header-left flex items-center gap-4">
        <h2 className="text-lg font-semibold">{roleName}</h2>
        <div className="search-bar flex items-center">
          <Search size={18} className="text-muted" />
          <input type="text" placeholder="Search anything..." className="search-input" />
        </div>
      </div>

      <div className="header-right flex items-center gap-4">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile flex items-center gap-3">
          <div className="user-info text-right">
            <p className="text-sm font-medium">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-muted">{user?.role || 'Guest'}</p>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: var(--header-height);
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 40;
          border-bottom: 1px solid var(--border);
        }
        .search-bar {
          background: #f1f5f9;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          width: 300px;
          gap: 0.5rem;
        }
        .search-input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.875rem;
          width: 100%;
        }
        .icon-btn {
          position: relative;
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: #f1f5f9;
        }
        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--danger);
          border: 2px solid white;
          border-radius: 50%;
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .search-bar { display: none; }
          .user-info { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
