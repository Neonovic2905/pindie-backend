const allowedCors = [
    'https://practicum.yandex.ru',
    'https://students-projects.ru',
    'localhost:3000', 
    'localhost:3001',
    "http://localhost:3000"     
  ]; 
  function cors(req, res, next) {
    const { origin } = req.headers;
//    console.log(origin);
    if (allowedCors.includes(origin)) { // Если это наш друг
        res.header('Access-Control-Allow-Origin', origin);
 
    }
    
    next();
} 


module.exports = {
    cors
  } ;