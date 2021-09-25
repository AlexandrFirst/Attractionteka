import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './components/app/App';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
  document.getElementById('root')
);
