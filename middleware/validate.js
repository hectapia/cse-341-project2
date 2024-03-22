const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
  const validationRule = {
    fname: 'required|string',
    lname: 'required|string',
    email: 'required|email',
    major: 'required|string',
    gender: 'required|string',
    city: 'required|string',
    state: 'required|string',
    birthdate: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveDepartment = (req, res, next) => {
    const validationRule = {
      department: 'required|string',
      deptCode: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveCourse = (req, res, next) => {
    const validationRule = {
      deptCode: 'required|string',
      courseNum: 'required|string',
      courseName: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveStudent,
  saveDepartment,
  saveCourse
};
