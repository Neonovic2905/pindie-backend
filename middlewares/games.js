
// Импортируем модель
const games = require("../models/game");
const findGameById = async (req, res, next) => {
  try {
      req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate("users"); // Загрузка связанных записей о пользователях
  next();
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
  }
}; 

const findAllGames = async (req, res, next) => {
  // Поиск всех игр в проекте по заданной категории
  if(req.query["categories.name"]) { 
    req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
    next();
    return;
  }
  // Поиск всех игр в проекте
  req.gamesArray = await games
    .find({})
    .populate("categories")
    .populate({
      path: "users",
      select: "-password" // Исключим данные о паролях пользователей
    })
  next();
};

const createGame = async (req, res, next) => {
    console.log("POST /games");
    try {
      console.log(req.body);
      req.game = await games.create(req.body);
      next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
    }
  }; 
  const updateGame = async (req, res, next) => {
    try {
        // В метод передаём id из параметров запроса и объект с новыми свойствами
      req.game = await games.findByIdAndUpdate(req.params.id, req.body);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Ошибка обновления игры" }));
    }
  }; 

  const deleteGame = async (req, res, next) => {
    try {
      // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
      req.game = await games.findByIdAndDelete(req.params.id);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка удаления игры" }));
    }
  }; 

  const checkEmptyFields = async (req, res, next) => {
    if(req.isVoteRequest) {
      next();
      return;
    }
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.link ||
      !req.body.developer
    ) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
    } else {
      next();
    }
  };   

  const checkIsGameExists = async (req, res, next) => {
    const isInArray = req.gamesArray.find((game) => {
      return req.body.title === game.title;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
    } else {
      next();
    }
  };   
  const checkIfCategoriesAvaliable = async (req, res, next) => {
    if(req.isVoteRequest) {
      next();
      return;
    }
    if (!req.body.categories || req.body.categories.length === 0) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Выберите хотя бы одну категорию" }));
    } else {
      next();
    }
  }; 
  const checkIfUsersAreSafe = async (req, res, next) => {
    if (!req.body.users) {
      next();
      return;
    }
    if (req.body.users.length - 1 === req.game.users.length) {
      next();
      return;
    } else {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
    }
  }; 

  const checkIsVoteRequest = async (req, res, next) => {
    // Если в запросе присылают только поле users
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
}; 

// Экспортируем функцию поиска всех игр
module.exports = {findAllGames,createGame, findGameById, updateGame, deleteGame, 
  checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkIfUsersAreSafe, checkIsVoteRequest}; 