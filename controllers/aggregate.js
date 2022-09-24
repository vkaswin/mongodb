const { default: mongoose } = require("mongoose");
const { Person } = require("../models");

const match = async (req, res) => {
  // $match : This resembles queries, where the list of documents is narrowed down through a set of criteria
  // This is equivalent to Person.find({ age: { $lte : 25 } })
  try {
    const list = await Person.aggregate([{ $match: { age: { $lte: 25 } } }]);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const sort = async (req, res) => {
  // $sort :  You can reorder documents based on a chosen field -1 will sort in decending order and 1 will sort in ascending order
  // $sort : we can sort by multiple keys as well
  /*
    the below query first will return all the document that matches the $match query then it will sort
    the documents in by name in decending order and then it will sort all the 
    documents again by eyeColor in decending order in case if multiple eyeColor field have same value then only it will 
    look for favoriteFruit and it will sort all the documents having same eyeColor value by favoriteFruit in descending order
  */
  try {
    const list = await Person.aggregate([
      {
        $match: {
          eyeColor: { $in: ["blue", "green"] },
          favoriteFruit: { $ne: "apple" },
        },
      },
      { $sort: { name: -1 } },
      { $sort: { eyeColor: -1, favoriteFruit: -1 } },
    ]);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const group = async (req, res) => {
  // $group : You can also process multiple documents together to form a summarized result
  // $group will returns all possible combination of the documents

  /*
        Eg : [
            {name :"John Doe", age : 24},
            {name : "Michel", age: 24},
            {name : "Jordan", age : 30},
            {name : "James", age : 32}
        ]
        { $group : {_id : {age : "$age"}} }
        the abouve query will returns all the possible combination of documents
        { _id : { age : 23} },
        { _id : { age : 30 } },
        { _id : { age : 32 } }
    */
  try {
    const list = await Person.aggregate([
      {
        $group: { _id: { eyeColor: "$eyeColor", age: "$age" } },
      },
    ]);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const project = async (req, res) => {
  // $project : The ability to change the structure of documents means you can remove or rename certain fields, or perhaps rename or group fields within an embedded document for legibility
  // project will be used to filter the value if we pass 1 it will return that field in the doucments
  // and 0 will not return the field in the documents also we can restructure the document as well

  try {
    const list = await Person.aggregate([
      {
        $match: { tags: { $size: 5 } },
      },
      {
        $sort: { name: -1 },
      },
      {
        $project: {
          fullName: "$name",
          country: "$company.location.country",
        },
      },
    ]);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const unwind = async (req, res) => {
  // $unwind splits each document with specified array to several doucments - one document per array element
  // if tags array has 3 elements then it will return three documents for each element in a array
  try {
    const list = await Person.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $unwind: "$friends",
      },
      { $match: { "friends.id": { $in: [0, 1] } } },
    ]);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const count = async (req, res) => {
  try {
    const total = await Person.aggregate([
      { $match: { age: { $lte: 24 } } },
      { $count: "totalDocuments" },
    ]);
    res.status(200).send({ message: "Success", data: { total } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

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

module.exports = {
  match,
  sort,
  group,
  project,
  unwind,
  count,
  accumulators,
  unaryOperator,
  out,
  filter,
};
