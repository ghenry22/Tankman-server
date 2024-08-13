const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/tankman-db.sqlite',
  logging: console.info()
});

// Define Tank model
class Tank extends Model {}
Tank.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    diameter: DataTypes.NUMBER,
    height: DataTypes.NUMBER,
    statedCapacity: DataTypes.NUMBER,
    capacityUnit: DataTypes.STRING,
    dateAdded: DataTypes.DATE,
}, { sequelize, modelName: 'tank' });

// Define the measurement model
class Measurement extends Model {}
Measurement.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    tankId: DataTypes.NUMBER,
    level: DataTypes.NUMBER,
    availableCapacity: DataTypes.NUMBER,
    availablePercentage: DataTypes.NUMBER,
    dateAdded: DataTypes.DATE
}, { sequelize, modelName: 'measurement' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CRUD routes for Tank model
app.get('/tanks', async (req, res) => {
  const tanks = await Tank.findAll();
  res.json(tanks);
});

app.get('/tanks/:id', async (req, res) => {
  const tank = await Tank.findByPk(req.params.id);
  res.json(tank);
});

app.post('/tanks', async (req, res) => {
  const tank = await Tank.create(req.body);
  res.json(tank);
});

app.put('/tanks/:id', async (req, res) => {
  const tank = await Tank.findByPk(req.params.id);
  if (tank) {
    await tank.update(req.body);
    res.json(tank);
  } else {
    res.status(404).json({ message: 'Tank not found' });
  }
});

app.delete('/tanks/:id', async (req, res) => {
  const tank = await Tank.findByPk(req.params.id);
  if (tank) {
    await tank.destroy();
    res.json({ message: 'Tank deleted' });
  } else {
    res.status(404).json({ message: 'Tank not found' });
  }
});

// CRUD routes for Measurement model
app.get('/measurements', async (req, res) => {
    const measurements = await Measurement.findAll();
    res.json(measurements);
});

app.get('/measurements/:id', async (req, res) => {
    const measurement = await Measurement.findByPk(req.params.id);
    res.json(measurement);
});

app.post('/measurements', async (req, res) => {
    const measurement = await Measurement.create(req.body);
    res.json(measurement);
});

app.put('/measurements/:id', async (req, res) => {
    const measurement = await Measurement.findByPk(req.params.id);
    if (measurement) {
        await measurement.update(req.body);
        res.json(measurement);
    } else {
        res.status(404).json({ message: 'Measurement not found' });
    }
});

app.delete('/measurements/:id', async (req, res) => {
    const measurement = await Measurement.findByPk(req.params.id);
    if (measurement) {
        await measurement.destroy();
        res.json({ message: 'Measurement deleted' });
    } else {
        res.status(404).json({ message: 'Measurement not found' });
    }
});

// Custom routes
app.get('/latestmeasurementbytankid/:id', async (req, res) => {
    const measurement = await Measurement.findOne({
        where: {
            tankId: req.params.id
        },
        order: [['dateAdded', 'DESC']]
    });
    res.json(measurement);
});

app.get('/allmeasurementsbytankid/:id', async (req, res) => {
    const measurements = await Measurement.findAll({
        where: {
            tankId: req.params.id
        }
    });
    res.json(measurements);
});

app.get('/livemeasurement', async (req, res) => {
    res.json({ level: Math.random() * 100 });
});

// Health Check
// TODO add sensor health check
app.get('/health', (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
      };
    
      res.status(httpStatus.OK).send(data);
});

// Start Schedule jobs to take readings
// TODO, configurable schedule, real sensor readings
cron.schedule('*/10 * * * * *', async () => {
    try {
        console.log('running scheduled task to fetch levels every 10 seconds');
        const tanks = await Tank.findAll();
        tanks.forEach(async tank => {
            const measurement = {
                tankId: tank.id,
                level: Math.random() * 100,
                availableCapacity: Math.random() * 100,
                availablePercentage: Math.random() * 100,
                dateAdded: new Date()
            };
            await Measurement.create(measurement);
        });
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});