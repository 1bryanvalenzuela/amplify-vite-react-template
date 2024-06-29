// src/components/Header.js
import React from 'react';
import './Header.css'; // Opcional: para estilos personalizados
import { Outlet, Link } from 'react-router-dom';
import Auth from './Auth'

const Header: React.FC = () => {
  return (

    <div className='header-container'>
      <nav className='header-nav'>
        <ul className="nav-list">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/data">Data</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/test">Test</Link></li>
          <li><Link to="/searcher">Searcher</Link></li>
          <Auth />
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;