const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression')
const cors = require('cors');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

// Scheduler
const scheduler = require('./config/scheduler');

// Routes
const tankRouter = require('./routes/tank.route');
const measurementRouter = require('./routes/measurement.route');
const dataRouter = require('./routes/data.route');
const healthRouter = require('./routes/health.route');
const settingRouter = require('./routes/setting.route');

const app = express();
const port = 3000;

// Start Schedule jobs to take readings
scheduler.setupScheduler();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable compression
app.use(compression());

// Enable CORS
app.use(cors());
app.options('*', cors());

// Routes
app.use("/tanks", tankRouter);
app.use("/measurements", measurementRouter);
app.use("/data", dataRouter);
app.use("/health", healthRouter);
app.use("/settings", settingRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});