// src/components/Header.js
import React from 'react';
import './Header.css'; // Opcional: para estilos personalizados
import { Outlet, Link } from 'react-router-dom';
import Auth from './Auth'
import Searcher from './Searcher'

const Header: React.FC = () => {
  return (

    <div className='all-site'>
      <header className='header'>
      <a className='logo'><Link to="/">Inicio</Link></a>
        <nav className="nav">
          <a><Link to="/data">Del-Data</Link></a>
          <a><Link to="/perfil">Perfil</Link></a>
          <a><Link to="/add-data">Add-Data</Link></a>
          <a><Link to="/test">Test</Link></a>
          <a><Auth /></a>
        </nav>
      <Searcher />
      </header>
      <Outlet />
    </div>
  );
}

export default Header;