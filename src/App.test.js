import { render, screen, fireEvent } from '@testing-library/react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleWare from 'redux-saga';
import { reducer } from './redux/restaurantRedux.js';
import watcherSaga from './redux/saga.js';

import App from './App.js';
import RegisterPage from './pages/register-page/register.page.jsx';
import LoginPage from './pages/login-page/login.page.jsx';
import RestaurantsList from './components/restaurant-list/restaurants.list.component.jsx';
import RestaurantData from './components/restaurant-data/restaurant.data.component.jsx';

test('renders home page', () => {
    render(<App />);
    const app = screen.getByText(/Restaurant Finder/);
    expect(app).toBeInTheDocument();
});

test('renders register page', () => {
    render(<RegisterPage />);
    const register = screen.getAllByText(/Register/);
    expect(register[0]).toBeInTheDocument();
});

test('renders login page', () => {
    render(<LoginPage />);
    const login = screen.getAllByText(/Login/);
    expect(login[0]).toBeInTheDocument();
});

test('Restaurants List should be displayed upon clicking discover', async () => {
    const sagaMiddleWare = createSagaMiddleWare('saga');
    let store = createStore(reducer, applyMiddleware(sagaMiddleWare));
    sagaMiddleWare.run(watcherSaga);
    render(
        <Provider store={store}>
            <RestaurantsList />
        </Provider>
    );
    const discoverButton = screen.getByText(/Discover Food Joints/);
    fireEvent(discoverButton, new MouseEvent('click'));
    setTimeout(() => {
        const table = screen.getByText(/Name/);
        expect(table).toBeInTheDocument();
    }, 5000);
    expect(discoverButton).toBeInTheDocument();
});

test('Restaurant data should be correctly displayed', () => {
    const history = createMemoryHistory();
    const state = {
        resName: "Parallax Restaurant",
        place: "Kolkata",
        priceForTwo: 450,
        ratingOutOf5: 4,
        vegOrNonveg: "veg"
    }
    history.push('/restaurant', state);
    const { getByText } = render(
        <Router history={history}>
            <RestaurantData />
        </Router>
    )
    const cuisine = screen.getByText(/Cuisine/);
    expect(cuisine).toBeInTheDocument();
})