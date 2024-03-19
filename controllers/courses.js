const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('courses').find();
    result.toArray().then((courses) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(courses);
    });
};

const getSingle = async (req, res) => {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('courses').find({_id: courseId});
    result.toArray().then((courses) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(courses[0]);
    });
};

const createCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const course = {
        deptCode: req.body.deptCode, 
        courseNum: req.body.courseNum, 
        courseName: req.body.courseName 
    };
    const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the course');
    }
};

const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const courseId = new ObjectId(req.params.id);
    const course = {
        deptCode: req.body.deptCode, 
        courseNum: req.body.courseNum, 
        courseName: req.body.courseName 
    };
    const response = await mongodb.getDatabase().db().collection('courses').replaceOne({_id: courseId},course);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the course');
    }
};

const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('courses').deleteOne({_id: courseId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the course');
    }
}

module.exports = {
    getAll,
    getSingle,
    createCourse,
    updateCourse,
    deleteCourse
}