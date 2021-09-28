import React from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantForm from '../restaurant-form/restaurant.form.component.jsx';

import './restaurant.data.component.css';

const RestaurantData = () => {

    const location = useLocation();
    const {
        resName,
        place,
        priceForTwo,
        ratingOutOf5,
        vegOrNonveg
    } = location.state;

    return (
        <div>
            <br />
            <div className="res-data">
                <h3>{resName}</h3>
                <h3>Place: {place}</h3>
                <h3>Price For Two: ₹ {priceForTwo}</h3>
                <h4>Rating: {ratingOutOf5} / 5</h4>
                <h4>Cuisine: {vegOrNonveg[0].toUpperCase() + vegOrNonveg.slice(1)}</h4>
            </div>
            <br />
            <RestaurantForm />
        </div>
    )
}

export default RestaurantData;