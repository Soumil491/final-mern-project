const express = require('express');
const cors = require('cors');
const data = require('./restaurant-data/data.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let dotenv = require('dotenv');
dotenv.config();

let db = require('./config/database.js');
db.connect();

const restaurantApp = express();
const port = process.env.PORT || 5000;

restaurantApp.use(cors());
restaurantApp.use(express.json());

const User = require('./model/user.js');
const Booking = require('./model/booking.js');
const auth = require('./middleware/auth.js');

//Welcome
restaurantApp.post('/welcome', auth, (req, res) => {
    res.status(200).send('Welcome 🙌');
})

//Register
restaurantApp.post('/register', async (req, res) => {
    try {
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send('All input is required');
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send('User already exists. Please Login');
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user.id, email },
            'thisIsJSONTokenKey',
            {
                expiresIn: "2h"
            }
        );

        user.token = token;

        res.status(201).send(user.token);
    }
    catch (err) {
        res.send(err);
    }
});

//Login
restaurantApp.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send('All input is required');
        }

        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { user_id: user.id, email },
                'thisIsJSONTokenKey',
                {
                    expiresIn: '2h'
                }
            );

            user.token = token;

            res.status(200).send(user.token);
        }
        res.send('Invalid credentials');
    }
    catch (err) {
        console.error(err);
    }
});

//Get List of Restaurants
restaurantApp.get('/getListOfPlaces', (req, res) => {
    const getRestaurants = () => {
        try {
            const result = data;
            res.status(200).send(result);
        }
        catch (error) {
            console.error(error);
        }
    }
    getRestaurants();
})

// Adding answer of restaurant form to database
restaurantApp.post('/submitQuery', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mobileNo = req.body.mobileNo;
    const query = req.body.query;

    // console.log(firstName, lastName, mobileNo, query);

    const newBooking = new Booking({
        firstName,
        lastName,
        mobileNo,
        query
    });

    newBooking
        .save()
        .then(() => res.send('Booking successfully completed'))
        .catch((err) => { console.log(err); res.send('Error: ' + err) });
})

//Listen
if (!module.parent) {
    restaurantApp.listen(port, () => {
        console.log(`Restaurant server listening on port ${port}`);
    });
}


module.exports = restaurantApp;