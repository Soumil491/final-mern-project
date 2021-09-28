import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [User, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', User)
            .then(res => {
                window.localStorage.setItem('jwtToken', res.data);
                history.push('/discovery');
            })
    };

    return (
        <div className="register-page">
            <br />
            <h3>Register</h3>
            <br />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="first-name">First Name: </label>
                    <input type="text" id="first-name"
                        required
                        className="form-control"
                        value={User.firstName}
                        onChange={(e) => {
                            setUser({ ...User, firstName: e.target.value })
                        }} />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="last-name">Last Name: </label>
                    <input type="text" id="last-name"
                        required
                        className="form-control"
                        value={User.lastName}
                        onChange={(e) => {
                            setUser({ ...User, lastName: e.target.value })
                        }} />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email"
                        required
                        className="form-control"
                        value={User.email}
                        onChange={(e) => {
                            setUser({ ...User, email: e.target.value })
                        }} />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password"
                        required
                        className="form-control"
                        value={User.password}
                        onChange={(e) => {
                            setUser({ ...User, password: e.target.value });
                        }} />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Register"
                        className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;