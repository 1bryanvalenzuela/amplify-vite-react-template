// src/components/Header.js
import React from 'react';
import './Header.css'; // Opcional: para estilos personalizados
import { Outlet, Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className='header-container'>
      <nav className='header-nav'>
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/data">Data</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;