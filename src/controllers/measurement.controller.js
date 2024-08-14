const Measurement = require('../models/measurement.model');

exports.findAll = async () => {
    try {
        const measurements = await Measurement.findAll();
        return measurements;
    } catch (error) {
        throw new Error('Error fetching measurements');
    }
};

exports.findById = async (id) => {
    try {
        const measurement = await Measurement.findByPk(id);
        if (!measurement) {
            throw new Error('Measurement not found');
        }
        return measurement;
    } catch (error) {
        throw new Error('Error fetching measurement');
    }
};

exports.create = async (data) => {
    try {
        const measurement = await Measurement.create(data);
        return measurement;
    } catch (error) {
        throw new Error('Error creating measurement');
    }
};

exports.update = async (id, data) => {
    try {
        const measurement = await Measurement.findByPk(id);
        if (!measurement) {
            throw new Error('Measurement not found');
        }
        await measurement.update(data);
        return measurement;
    } catch (error) {
        throw new Error('Error updating measurement');
    }
};

exports.destroy = async (id) => {
    try {
        const measurement = await Measurement.findByPk(id);
        if (!measurement) {
            throw new Error('Measurement not found');
        }
        await measurement.destroy();
        return;
    } catch (error) {
        throw new Error('Error deleting measurement');
    }
};