const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Departments']
    const result = await mongodb.getDatabase().db().collection('departments').find();
    result.toArray().then((departments) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(departments);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Departments']
    const departmentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('departments').find({_id: departmentId});
    result.toArray().then((departments) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(departments[0]);
    });
};

const createDepartment = async (req, res) => {
    //#swagger.tags=['Departments']
    const department = {
        department: req.body.department, 
        deptCode: req.body.deptCode
    };
    const response = await mongodb.getDatabase().db().collection('departments').insertOne(department);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the department');
    }
};

const updateDepartment = async (req, res) => {
    //#swagger.tags=['Departments']
    const departmentId = new ObjectId(req.params.id);
    const department = {
        department: req.body.department, 
        deptCode: req.body.deptCode
    };
    const response = await mongodb.getDatabase().db().collection('departments').replaceOne({_id: departmentId},department);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the department');
    }
};

const deleteDepartment = async (req, res) => {
    //#swagger.tags=['Departments']
    const departmentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('departments').deleteOne({_id: departmentId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the department');
    }
}

module.exports = {
    getAll,
    getSingle,
    createDepartment,
    updateDepartment,
    deleteDepartment
}