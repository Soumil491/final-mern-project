import React from 'react';
import { Link } from 'react-router-dom';

import './home.page.component.css';

const HomePage = () => {

    return (
        <div className="home-page container" >
            <br />
            <div className="contents">
                <Link to="/login" className="login btn btn-success">
                    Login
                </Link>
                <Link to="/register" className="register btn btn-primary">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default HomePage;
