import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const { user } = useApp();

  // If no user is logged in, we'll show the login/landing page logic elsewhere
  // For the purpose of this demo, we'll assume a default user if none exists
  // but in a real app we'd redirect.
  
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="content">
          {children}
        </main>
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }
        .main-wrapper {
          flex: 1;
          margin-left: var(--sidebar-width);
          display: flex;
          flex-direction: column;
        }
        .content {
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .main-wrapper {
            margin-left: 0;
            padding-bottom: 60px; /* For mobile nav if needed */
          }
          .content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
