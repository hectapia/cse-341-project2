const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('departments').find();
    result.toArray().then((departments) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(departments);
    });
};

const getSingle = async (req, res) => {
    const departmentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('departments').find({_id: departmentId});
    result.toArray().then((departments) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(departments[0]);
    });
};

module.exports = {
    getAll,
    getSingle,
}