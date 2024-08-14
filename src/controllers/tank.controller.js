const Tank = require('../models/tank.model');

exports.findAll = async () => {
    try {
        const tanks = await Tank.findAll();
        return tanks;
    } catch (error) {
        throw new Error('Error fetching tanks');
    }
};

exports.findById = async (id) => {
    try {
        const tank = await Tank.findByPk(id);
        if (!tank) {
            throw new Error('Tank not found');
        }
        return tank;
    } catch (error) {
        throw new Error('Error fetching tank');
    }
};

exports.create = async (data) => {
    try {
        const tank = await Tank.create(data);
        return tank;
    } catch (error) {
        throw new Error('Error creating tank');
    }
};

exports.update = async (id, data) => {
    try {
        const tank = await Tank.findByPk(id);
        if (!tank) {
            throw new Error('Tank not found');
        }
        await tank.update(data);
        return tank;
    } catch (error) {
        throw new Error('Error updating tank');
    }
};

exports.destroy = async (id) => {
    try {
        const tank = await Tank.findByPk(id);
        if (!tank) {
            throw new Error('Tank not found');
        }
        await tank.destroy();
        return;
    } catch (error) {
        throw new Error('Error deleting tank');
    }
};