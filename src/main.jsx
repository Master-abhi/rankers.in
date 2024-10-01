import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
// require('dotenv').config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
    <App />
    </Provider>
    
    
);

