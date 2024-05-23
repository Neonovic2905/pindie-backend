  // Создаём роут для запросов категорий 
  const categoriesRouter = require('express').Router();
  const { checkAuth } = require("../middlewares/auth.js");
  
  // Импортируем вспомогательные функции
  const { findAllCategories , findCategoryById , createCategory, updateCategory, deleteCategory,     checkIsCategoryExists,
    checkEmptyName } = require('../middlewares/categories');

  const {sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted } = require('../controllers/categories');

  // Обрабатываем GET-запрос с роутом '/categories'
  categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
  categoriesRouter.get('/categories/:id', findCategoryById , sendCategoryById );  
  categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
  );
  categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
  );
  categoriesRouter.delete(
    "/categories/:id",
    checkAuth,
    deleteCategory,
    sendCategoryDeleted
  ); 
  module.exports = categoriesRouter;