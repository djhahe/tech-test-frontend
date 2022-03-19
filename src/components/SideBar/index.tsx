import React from 'react';

import './SideBar.scss';

const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      {new Array(4).fill(undefined).map((value, index) => {
        return <div key={index} className="icon-circle"></div>;
      })}
      <div className="icon-circle icon-circle__bottom"></div>
    </div>
  );
};

export default SideBar;
