import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://ecommerce-fullstack-97s3.onrender.com";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);