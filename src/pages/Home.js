import React from 'react';
import { Link } from 'react-router-dom';

import links from '../config/links.json';

const Home = (props) => {
  return (
    <div className="container">
      <p>Select a calculator from the list below:</p>
      <ul className="list-group">
        {links.map((link, i) => (
          <li key={i} className="list-group-item">
            <Link to={link.url}>{link.display}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
