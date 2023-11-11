// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (userData) => {
  // Проверка, существует ли уже пользователь с таким email или login
  const existingUser = await User.findOne({ $or: [{ email: userData.email }, { login: userData.login }] });
  if (existingUser) {
    throw new Error('User with this email or login already exists');
  }

  // Создание нового пользователя
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const user = new User({ ...userData, password: hashedPassword });
  await user.save();
};



exports.findUser = async (userData) => {
  // Найти пользователя по email
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error('User not found');
  }
  // Сравнить введенный пароль с хешем пароля в базе данных
  const match = await bcrypt.compare(userData.password, user.password);
  if (!match) {
    throw new Error('Invalid password');
  }
  return user;
};