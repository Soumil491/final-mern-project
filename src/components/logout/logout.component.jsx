import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    const handleLogout = () => {
        window.localStorage.clear();
        history.replace('/');
    }

    return (
        <button id="logout" className="btn btn-danger"
            onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout;