const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
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
    },
    wins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    losses: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Signup failed' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, 'secretKey');
            res.json({ token, wins: user.wins, losses: user.losses });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Login failed' });
    }
});

app.post('/update-stats', async (req, res) => {
    const { token, result } = req.body;
    try {
        const decoded = jwt.verify(token, 'secretKey');
        const user = await User.findByPk(decoded.userId);
        if (result === 'win') {
            user.wins += 1;
        } else if (result === 'loss') {
            user.losses += 1;
        }
        await user.save();
        res.json({ wins: user.wins, losses: user.losses });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update stats' });
    }
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});
