const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression')

const swaggerUi = require('swagger-ui-express');

const scheduler = require('./config/scheduler');

const swaggerDocument = require('./config/swagger');

const tankRouter = require('./routes/tank.route');
const measurementRouter = require('./routes/measurement.route');
const dataRouter = require('./routes/data.route');
const healthRouter = require('./routes/health.route');

const app = express();
const port = 3001;

console.log(swaggerDocument);

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Other middleware
app.use(compression());

// Routes
app.use("/tanks", tankRouter);
app.use("/measurements", measurementRouter);
app.use("/data", dataRouter);
app.use("/health", healthRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});