import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import RegisterPage from './pages/register-page/register.page.jsx';
import LoginPage from './pages/login-page/login.page.jsx';
import HomePage from './pages/home-page/home.page.component.jsx';
import RestaurantsList from './components/restaurant-list/restaurants.list.component.jsx';
import RestaurantData from './components/restaurant-data/restaurant.data.component.jsx';
import Logout from './components/logout/logout.component.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <br /><br />
                    <Link to='/'className="brand-link">
                        <span className="brand h1">Restaurant Finder</span>
                        <Logout />
                    </Link>
                    
                    <Route path='/' exact component={HomePage} />
                    <Route path='/restaurant' exact component={RestaurantData} />
                    <Route path="/discovery" exact component={RestaurantsList} />
                    <Route path="/register" exact component={RegisterPage} />
                    <Route path="/login" exact component={LoginPage} />
                </div>

            </div>
        </Router>

    );
}

export default App;
