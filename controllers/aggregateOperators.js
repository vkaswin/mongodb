const { default: mongoose } = require("mongoose");
const { Person } = require("../models");

const accumulators = async (req, res) => {
  // $sum will add all the values in the group and return the total
  // $avg will return the avg value of the group
  // $max will return the max value in the group
  // $min will return the min value in the group
  // $first will return the first value in the group
  // $last will return the last value in the group

  // Note : accumulators are only used in $group stage
  try {
    const list = await Person.aggregate([
      { $match: { age: { $gte: 24, $lte: 30 } } },
      {
        $group: {
          _id: "$eyeColor",
          totalDocuments: { $sum: 1 },
          sum: { $sum: "$age" },
          avg: { $avg: "$age" },
          max: { $max: "$age" },
          min: { $min: "$age" },
          first: { $first: "$name" },
          last: { $last: "$name" },
        },
      },
    ]);
    res.status(200).send({ message: "Success", data: { list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const unaryOperator = async (req, res) => {
  // $and
  // $or
  // $gt
  // $lt
  // $multiple
  // $type

  // Note : unary operators will be used in $project stage
  // Note : unary operators will be used in $group stage within accumulators
  try {
    const list = await Person.aggregate([
      { $match: { age: { $gte: 24, $lte: 30 } } },
    ]);
    res.status(200).send({ message: "Success", data: { list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const out = async (req, res) => {
  // $out will add the returned documents in a new collection if the collection not exists
  // it will create a new collection and add the documents
  try {
    const list = await Person.aggregate([
      { $match: { age: { $gte: 24, $lte: 30 } } },
      { $out: "aggregateResult" },
    ]);
    res.status(200).send({ message: "Success", data: { list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const filter = async (req, res) => {
  // $filter will be used to filter an nested arrray based on certain conditions
  // Note : need to pass an field name and value as an array in condition
  try {
    const list = await Person.aggregate([
      { $match: {} },
      {
        $project: {
          friends: {
            $filter: {
              input: "$friends",
              as: "friend",
              cond: { $eq: ["$$friend.id", 0] },
            },
          },
        },
      },
      {
        $unwind: "$friends",
      },
    ]);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const addFields = async () => {
  try {
    const list = await Person.aggregate([
      {
        $addFields: { tagsCount: { $size: "$tags" } },
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  accumulators,
  unaryOperator,
  out,
  filter,
  addFields,
};
