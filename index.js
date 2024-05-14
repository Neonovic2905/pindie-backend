// app.js 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/main');
const { cors } = require('./middlewares/cors'); 
const connectToDatabase = require('./database/connect');
//const cors = require('./middlewares/cors');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const categoriesRouter = require('./routes/categories');

const PORT = 3000;
const app = express();
connectToDatabase();

app.use(
  cors, // Добавляем CORS самым первым
    bodyParser.json(),
    express.static(path.join(__dirname, 'public')),
        usersRouter, 
  gamesRouter, 
  categoriesRouter,
    mainRoute
); 

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
}) 