import React from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css';

const NavBar = () => {
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%', height: '12%' }}>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>

        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
      </div>
    </nav>
  )
}

export default NavBar