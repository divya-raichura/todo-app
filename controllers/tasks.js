const Task = require("../models/tasks");

const createTask = async (req, res) => {
  try {
    // why try catch?
    // if body does not follow above validations, error is thrown, we manage it in controllers file
    // so eg, name must be provided in body, cause we mentioned it in schema, if it is not provided, error is thrown, we manage that error here in catch block
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getSingleTask = async (req, res) => {
  try {
    // why two error responses?
    // because if id is of correct type, correct no of digits and we cannot find it in db, then 404
    // but if id is of wrong type or no of digits is incorrect then 500 error
    const { id } = req.params; // see video 1:53hr
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return res.status(404).json({ msg: `no task with id : ${id}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
