// Создаём роут для запросов категорий 
const usersRouter = require('express').Router();
const { checkAuth } = require("../middlewares/auth.js");
  
// Импортируем вспомогательные функции
const {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkIsUserExists, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, hashPassword }  = require('../middlewares/users');

const {sendAllUsers, sendUserCreated, sendUserById, 
  sendUserUpdated , sendUserDeleted, sendMe}  = require('../controllers/users');



// Обрабатываем GET-запрос с роутом '/categories'
usersRouter.get('/users', findAllUsers , sendAllUsers);
usersRouter.get('/users/:id', findUserById  , sendUserById );
usersRouter.get("/me", checkAuth, sendMe); 
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
); 
// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;