import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
// Our Components
import Login from './components/login/Login';
import Signup from './components/signup/signup';
import Verify from './components/verify/verify';
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup"component={Signup} />
            <Route exact path="/verify" component={Verify} />
        </div>
        
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
