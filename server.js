const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const path = require('path');

const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true in production with HTTPS
}));

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hash });
        res.json({ success: true });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Signup failed' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, username: user.username };
            res.json({ success: true, username: user.username });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

app.post('/update-win-loss', (req, res) => {
    if (req.session.user) {
        const isXWinner = req.body.isXWinner;
        if (isXWinner) {
            req.session.wins = (req.session.wins || 0) + 1;
        } else {
            req.session.losses = (req.session.losses || 0) + 1;
        }
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'User not logged in' });
    }
});

app.get('/get-win-loss', (req, res) => {
    if (req.session.user) {
        res.json({
            success: true,
            wins: req.session.wins || 0,
            losses: req.session.losses || 0
        });
    } else {
        res.status(401).json({ success: false, message: 'User not logged in' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    sequelize.sync();
});
