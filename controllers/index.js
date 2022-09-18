const { Person } = require("../models");

const findAll = async (req, res) => {
  try {
    // empyt object in find method returns all the documents in a collection
    // countDocuments will retun the total no of documents in a collection
    const list = await Person.find({});
    const total = await Person.countDocuments();
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    req.status(400).send({ message: "Error" });
  }
};

const findByExactMatch = async (req, res) => {
  try {
    // returns the all the document matches name
    const list = await Person.find({
      name: "Francine Glenn",
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    req.status(400).send({ message: "Error" });
  }
};

const findByExactMatchInNestedObject = async (req, res) => {
  try {
    // returns all the document that matches email in company object
    // use dot to access neseted object and the expression should be inside quotation
    const list = await Person.find({
      "company.email": "kittysnow@digitalus.com",
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    req.status(400).send({ message: "Error" });
  }
};

const findByMultipleCondition = async (req, res) => {
  try {
    // retuns all the document if passes all the condition
    // comma (,) will be used to query multiple condition
    const list = await Person.find({
      gender: "male",
      eyeColor: "blue",
      isActive: true,
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    req.status(400).send({ message: "Error" });
  }
};

const findByComparision = async (req, res) => {
  // comparision operators : $eq, $ne, $gt, $lt, $gte, $lte, $in, $nin
  // $in and $nin requires an array value
  try {
    const list = await Person.find({
      eyeColor: { $in: ["blue", "brown"] },
      age: { $gte: 20, $lte: 25 },
      "company.location.country": { $ne: "USA", $ne: "France" }, // (,) means and operator return if the document matchs all the condition
      favoriteFruit: { $nin: ["apple", "banana"] },
      name: { $gt: "S" }, // can use the comparision operatior in string and date also
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByAndOperator = async (req, res) => {
  // $and requires array of conditions
  // returns an all the document that matches all the conditions
  try {
    const list = await Person.find({
      $and: [{ age: { $nin: [25] } }, { age: { $gte: 20 } }],
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByOrOperator = async (req, res) => {
  // $or requires array of conditions
  // returns an all the document that matches any one condition
  try {
    const list = await Person.find({
      $or: [
        { age: { $in: [24, 25] } },
        { "company.location.country": { $nin: ["USA", "France"] } },
        { eyeColor: { $nin: ["blue", "brown"] } },
      ],
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByNorOperator = async (req, res) => {
  // $or requires array of conditions
  // returns an all the document that not matches all the conditions
  try {
    const list = await Person.find({
      $nor: [{ age: { $gt: 20 } }],
    });
    //   $nor: [
    //     { age: { $gte: 25 } },
    //     { isActive: false },
    //     { "company.location.country": { $ } },
    //   ],
    console.log(list);
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByArray = async (req, res) => {
  try {
    // retuns all the documents that contains the string "consequat" as one of its elements
    const queryOne = Person.find({ tags: "consequat" });

    // returns all the documents that contains string "velit" in the third element of an array
    const queryTwo = Person.find({ "tags.2": "velit" });

    // returns all the documents that contains exactly five elements "enim", "id", "velit", "ad", "consequat" in the specified order
    const queryThree = Person.find({
      tags: ["enim", "id", "velit", "ad", "consequat"],
    });

    // returns all the documents that contains both the elements "enim" and "id", without regard to order or other elements in the array
    const queryFour = Person.find({ tags: { $all: ["enim", "id"] } });

    // returns all the documents that length is 3
    const queryFive = Person.find({ tags: { $size: 3 } });

    const [one, two, three, four, five] = await Promise.all([
      queryOne,
      queryTwo,
      queryThree,
      queryFour,
      queryFive,
    ]);
    res
      .status(200)
      .send({ message: "Success", data: { one, two, three, four, five } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByArrayElementMatch = async (req, res) => {
  try {
    // returns all the documents if an atlease one sub document in a array matches all the conditions
    // $elementMatch will be used to query an nested array
    const list = await Person.find({
      friends: { $elemMatch: { age: { $lte: 20 }, gender: { $eq: "male" } } },
    });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByTypeAndExist = async (req, res) => {
  const bsonIdentifiers = {
    string: 2,
    object: 3,
    array: 4,
    boolean: 8,
    int: 16,
    long: 18,
    double: 1,
    date: 9,
    objectId: 7,
  };

  try {
    // returns all the documents if the field type matches
    const queryOne = Person.find({
      company: { $type: bsonIdentifiers.object },
      tags: { $type: bsonIdentifiers.array },
    }).count();

    // returns all the documents if the field exists
    // note - that field should be defined in the schema
    const queryTwo = Person.find({
      height: { $exists: true },
    }).count();

    const [one, two] = await Promise.all([queryOne, queryTwo]);

    res.status(200).send({ message: "Success", data: { one, two } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findAndFilterField = async (req, res) => {
  try {
    // returns all the documents and the documents contains only name and age
    const list = await Person.find({}, { name: 1, age: 1 });
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByRegex = async (req, res) => {
  try {
    const { search } = req.query;

    // returns all the documents that matches the regex
    const list = await Person.find(
      {
        name: { $regex: search, $options: "i" },
      },
      { name: 1, age: 1 }
    );
    const total = list.length;
    res.status(200).send({ message: "Success", data: { total, list } });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const findByPageAndLimit = async (req, res) => {
  try {
    const { page = 1, limit = 25 } = req.query;

    // sort, skip, limit order of execution will be like this even we change the order in chaining
    // count method result will be based on the query we pass not on the sort, skip, limit
    const list = await Person.find({})
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Person.find({}).countDocuments();
    const totalPages = Math.ceil(total / limit);
    res.status(200).send({
      message: "Success",
      data: { pageMeta: { page, totalPages, total }, list },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  findAll,
  findByExactMatch,
  findByExactMatchInNestedObject,
  findByMultipleCondition,
  findByComparision,
  findByAndOperator,
  findByOrOperator,
  findByNorOperator,
  findByArray,
  findByArrayElementMatch,
  findByTypeAndExist,
  findAndFilterField,
  findByRegex,
  findByPageAndLimit,
};
