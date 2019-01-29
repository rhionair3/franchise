import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
// import App from './App';
import Dashboard from './components/Dashboard';
import CartList from './components/CartList';
import Users from './components/Users';
import Login from './components/Login';
import Formcart from './components/Formcart';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router>
		<div>
			<Route exact path='/' component={Dashboard} />
			<Route path='/cartlist' component={CartList} />
			<Route path='/users' component={Users} />
			<Route path='/login' component={Login} />
			<Route path='/add-cart' component={Formcart} />
			<Route path='/edit-cart' component={Formcart} />

		</div>
	</Router>,
document.getElementById('root'));

serviceWorker.unregister();
