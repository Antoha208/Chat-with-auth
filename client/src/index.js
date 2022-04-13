import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.js';
import { Provider } from 'react-redux'
import { store } from './store/index'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store = {store}>
        <App />
    </Provider>
)

