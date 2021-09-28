//using sagas

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './restaurants.list.component.css';

class RestaurantsList extends React.Component {

    render() {
        // eslint-disable-next-line
        const { fetching, data, onRequestData, error } = this.props;

        return (
            <div>
                {data !== null ?
                    <div>
                        <h3>Restaurants List</h3>
                        <table className="table table-striped table-dark">
                            <thead id="checkDisplay">
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Price For 2</th>
                                    <th>Rating (out of 5)</th>
                                    <th>Veg or Non-veg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (function () {
                                        if (data === null) {
                                            const discover = document.querySelector('#discover');
                                            console.log(discover);
                                            discover.classList.add('d-none');
                                        }
                                    })()
                                }
                                {
                                    data.map(restaurant => {
                                        return (
                                            <tr key={data.indexOf(restaurant)}>
                                                <td>
                                                    <Link className="link-item" to={{
                                                        pathname: '/restaurant',
                                                        state: {
                                                            resName: restaurant.name,
                                                            place: restaurant.location,
                                                            priceForTwo: restaurant.priceForTwo,
                                                            ratingOutOf5: restaurant.ratingOutOf5,
                                                            vegOrNonveg: restaurant.vegOrNonveg
                                                        }
                                                    }} >
                                                        {restaurant.name}
                                                    </Link>
                                                </td>
                                                <td>{restaurant.location}</td>
                                                <td>{restaurant.priceForTwo}</td>
                                                <td>{restaurant.ratingOutOf5}</td>
                                                <td>{restaurant.vegOrNonveg}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <div>
                        <br />
                        <button id="discover" className="btn btn-primary" onClick={onRequestData}>Discover Food Joints</button>
                    </div>

                }
                <br />
                {error && <p style={{ color: "red" }}>Sorry - Something went wrong!</p>}

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        data: state.data,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: () => dispatch({ type: 'API_CALL_REQUEST' })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsList)