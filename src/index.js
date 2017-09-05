import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/sweetalert/dist/sweetalert.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
