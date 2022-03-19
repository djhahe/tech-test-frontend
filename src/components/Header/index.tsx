import React from 'react';

import './Header.scss';

const Header: React.FC = (props) => {
  return (
    <div className="header">
      <div className="header_content">{props.children || 'Header'}</div>
    </div>
  );
};

export default Header;
