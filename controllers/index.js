const { Person } = require("../models");

const findAll = async (req, res) => {
  try {
    const list = await Person.find({});
    const total = await Person.countDocuments();
    res.status(200).send({ message: "Success", data: { list, total } });
  } catch (error) {
    console.log(error);
    req.status(400).send({ message: "Error" });
  }
};

module.exports = {
  findAll,
};
