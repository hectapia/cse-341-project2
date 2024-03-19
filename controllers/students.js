const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(students);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find a student.');
      }
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({_id: studentId});
    result.toArray().then((students) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(students[0]);
    });
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const student = {
        fname: req.body.fname, 
        lname: req.body.lname, 
        email: req.body.email, 
        major: req.body.major, 
        gender: req.body.gender, 
        city: req.body.city, 
        state: req.body.state, 
        birthdate: req.body.birthdate
    };
    const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the student');
    }
};

const updateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to update a student.');
      }
    const studentId = new ObjectId(req.params.id);
    const student = {
        fname: req.body.fname, 
        lname: req.body.lname, 
        email: req.body.email, 
        major: req.body.major, 
        gender: req.body.gender, 
        city: req.body.city, 
        state: req.body.state, 
        birthdate: req.body.birthdate
    };
    const response = await mongodb.getDatabase().db().collection('students').replaceOne({_id: studentId},student);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the student');
    }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to delete a student.');
      }
    const studentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('students').deleteOne({_id: studentId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the student');
    }
}

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
}