import React from 'react';
import reactLogo from '../../images/ic-react.png';
import {NavLink} from 'react-router-dom';

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary-subtle ps-5 pe-5 pt-2 pb-2 d-flex justify-content-between">
      <div className="d-flex align-items-center justify-content-between">
        <div className="p-2">
          <img className="w-50 h-50" src={reactLogo} alt="React Logo"/>
        </div>
        <div className="d-flex align-items-center flex-column">
          <span>Test work 8</span>
          <strong>Collection of quotes</strong>
        </div>
      </div>
      <ul className="navbar-nav mr-auto flex-row flex-nowrap align-items-center justify-content-center gap-3">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">Quotes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/addquotes" className="nav-link">Add new quotes</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Toolbar;