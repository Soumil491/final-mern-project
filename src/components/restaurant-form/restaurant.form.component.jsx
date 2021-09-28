import React, { useState } from 'react';
import axios from 'axios';

const RestaurantForm = () => {
    const [Answers, setAnswers] = useState({
        firstName: 'hello',
        lastName: '',
        mobileNo: 0,
        query: 0
    });

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(Answers);
        axios.post('http://localhost:5000/submitQuery', Answers)
            .then(res =>{
                if(res.data === 'Booking successfully completed') alert('Booking successfully completed');
                else alert('Multiple submission not allowed');
            })
            .catch(err => console.log('Error: ' + err))
    }

    return (
        <div className="form-query">
            <h4>Booking</h4>
            <br />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">What is your First Name?</label>
                    <input className="form-control" id="firstName" type="text" required
                        onChange={(e) =>
                            setAnswers({ ...Answers, firstName: e.target.value })} />
                </div>

                <br />
                <div className="form-group">
                    <label htmlFor="lastName">What is your Last Name?</label>
                    <input className="form-control" id="lastName" type="text" required
                        onChange={(e) =>
                            setAnswers({ ...Answers, lastName: e.target.value })} />
                </div>

                <br />
                <div className="form-group">
                    <label htmlFor="mobileNo">What is your Mobile No?</label>
                    <input className="form-control" id="mobileNo" type="text" maxLength={10} required
                        onChange={(e) =>
                            setAnswers({ ...Answers, mobileNo: parseInt(e.target.value) })} />
                </div>

                <br />
                <div className="form-group">
                    <label htmlFor="query">How many people are you booking for?</label>
                    <input className="form-control" id="query" type="number" required
                        onChange={(e) =>
                            setAnswers({ ...Answers, query: parseInt(e.target.value) })} />
                </div>

                <br />
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
                <br />
            </form>
        </div>
    )
}

export default RestaurantForm;