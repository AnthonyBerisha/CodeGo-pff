'use strict'

// const swaggerUI = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require("http");

const app = express();
const router = express.Router();

app.set('secretKey', process.env.SERVER_JWT_SECRET);

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
// app.use(cors({credentials: true, origin: true}));
/* app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}) */
app.use(cookieParser());

mongoose.Promise = Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

const server = http.createServer((request, response) => {
  let date = new Date().toISOString();
  console.log(`[${date}]localhost:5000${request.url}`);
  response.end();
});

app.use(bodyParser.json(),cors())

const authRouter = require('../routes/auth.routes');
app.use('/auth', authRouter);

const productRouter = require('../routes/product.routes');
app.use('/product', productRouter);

const categoryRouter = require('../routes/category.routes');
app.use('/category', categoryRouter);

const orderRouter = require('../routes/order.routes');
app.use('/order', orderRouter);

const userRouter = require('../routes/user.routes');
app.use('/user', userRouter);

app.get('/', (req, res) => res.send('Hello Start Up Nation!'));
 
app.all('*', (request, response) => {
  console.log('Returning a 404 from the catch-all route');
  return response.sendStatus(404);
});

/////////////// module export

module.exports.start = () => {
  app.listen(PORT, (req, res) =>{
    console.log(`Listening on port: ${PORT}`)
    console.log(`Connected to DB`);
    if (req) {
      let date = new Date().toISOString();
      console.log(`[${date}]localhost:5000${req.url}`);
      res.end();
    }
  })
}



// export const stop = () => {
//   app.close(PORT, () => {
//     console.log(`Shut down on port: ${PORT}`)
//   })
// }
