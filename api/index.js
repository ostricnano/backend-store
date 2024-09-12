const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//con esta configuracion acepta cualquier origen
app.use(cors());
// agregamos los origenes los cuales vamos a aceptar peticiones
// const whitelist = ['http://localhost:8000', 'http://example2.com','http://localhost:3000/api'];
// const options = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin || !origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// app.use(cors(options));

app.get('api/', (req, res) => {
  res.send('Hello World!');
});
routerApi(app);

/* Los middlewares tiene que ir despues del routerApi(app) */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
