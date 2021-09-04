import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import './Navbar.css';

const RightMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="Upload">
        <a href="/video/upload" style={{ 'color': 'rgb(37, 141, 252)' }}>Upload</a>
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(RightMenu);