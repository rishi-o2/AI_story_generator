import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Route from './Routing'; // Assuming this is your Routing component

ReactDOM.render(
  <BrowserRouter> {/* Wrap your routes with BrowserRouter */}
    <Route />
  </BrowserRouter>,
  document.getElementById('root')
);

