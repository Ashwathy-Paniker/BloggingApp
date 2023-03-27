import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from '../src/component/redux/store';

ReactDOM.render(
	<React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
reportWebVitals();

