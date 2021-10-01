import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    const handleLogout = () => {
        window.localStorage.clear();
        history.replace('/');
        document.getElementById('logout').classList.add('d-none');
    }

    return (
        <button id="logout" className="btn btn-danger d-none"
            onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout;