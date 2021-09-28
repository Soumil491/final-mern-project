import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [Credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        const incorrectLogin = document.getElementById('incorrect-login');
        axios.post('http://localhost:5000/login', Credentials)
            .then(res => {
                // if (res.data === 'User logged in successfully') {
                //     if(!(incorrectLogin.classList.contains('d-none'))) incorrectLogin.classList.add('d-none');
                //     history.push('/discovery');
                // }
                if (res.data === 'Invalid credentials') {
                    if (incorrectLogin.classList.contains('d-none')) incorrectLogin.classList.remove('d-none');
                }
                else {
                    window.localStorage.setItem('jwtToken', res.data);
                    if (!(incorrectLogin.classList.contains('d-none'))) incorrectLogin.classList.add('d-none');
                    history.push('/discovery');
                }
            })
    }

    return (
        <div className="login-page container">
            <br /><br />
            <div className="login-contents">
                <h3>Login</h3>
                <br />
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email"
                            required
                            className="form-control"
                            value={Credentials.email}
                            onChange={(e) => {
                                setCredentials({ ...Credentials, email: e.target.value });
                            }} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password"
                            required
                            className="form-control"
                            value={Credentials.password}
                            onChange={(e) => {
                                setCredentials({ ...Credentials, password: e.target.value });
                            }} />
                    </div>
                    <br />
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
            <div id="incorrect-login" style={{ "borderRadius": "15px" }}
                className="bg-danger text-white mt-3 p-3 d-none">
                <p>Invalid credentials. Please try again</p>
            </div>
        </div>
    )
}

export default LoginPage;