// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

router.post('/register', async (req, res) => {
    const { email, login, password } = req.body;
    if (!email || !login || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    try {
        await userController.createUser(req.body);

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      const user = await userController.findUser(req.body);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      req.session.userId = user._id.toString();
      req.session.login = user.login;
      res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

//   339918182318-mnao9hirveih24d8r4vfo5tp8abl66tf.apps.googleusercontent.com
// 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

module.exports = router;