const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user.id
        })
        res.status(200).json(categories);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.pramas.id)
        res.status(200).json(category);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Category.remove({
            _id: req.pramas.id
        });
        await Position.remove({
            category: req.pramas.id
        });
        res.status(200).json({
            message: 'Скатегория удалена'
        })
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.create = (req, res) => {
    try {

    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.update = (req, res) => {
    try {

    } catch (error) {
        errorHandler(res, error);
    }
}