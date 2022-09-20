const mongoose = require("mongoose");
const { Person } = require("../models");

const checkDataExist = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send({ message: "Invalid Id" });

    const isExist = await Person.findById(id);

    if (!isExist) return res.status(400).send({ message: "Data Not Found" });

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { checkDataExist };
