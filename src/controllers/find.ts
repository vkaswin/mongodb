import Person from "../models/person";
import mongoose from "mongoose";
import { asyncHandler } from "../utils";

export const findAll = asyncHandler(async (req, res) => {
  // empyt object in find method returns all the documents in a collection
  // countDocuments will retun the total no of documents in a collection
  let list = await Person.find({});
  let total = await Person.countDocuments();
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByExactMatch = asyncHandler(async (req, res) => {
  // returns the all the document matches name
  let list = await Person.find({
    name: "Marie Sutton",
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByExactMatchInNestedObject = asyncHandler(async (req, res) => {
  // returns all the document that matches email in company object
  // use dot to access neseted object and the expression should be inside quotation
  let list = await Person.find({
    "company.email": "kittysnow@digitalus.com",
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByMultipleCondition = asyncHandler(async (req, res) => {
  // retuns all the document if passes all the condition
  // comma (,) will be used to query multiple condition
  let list = await Person.find({
    gender: "male",
    eyeColor: "blue",
    isActive: true,
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByComparision = asyncHandler(async (req, res) => {
  // comparision operators : $eq, $ne, $gt, $lt, $gte, $lte, $in, $nin
  // $in and $nin requires an array value

  let list = await Person.find({
    eyeColor: { $in: ["blue", "brown"] },
    age: { $gte: 20, $lte: 25 },
    "company.location.country": { $ne: "USA" },
    favoriteFruit: { $nin: ["apple", "banana"] },
    name: { $gt: "S" }, // can use the comparision operatior in string and date also
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByAndOperator = asyncHandler(async (req, res) => {
  // $and requires array of conditions
  // returns an all the document that matches all the conditions

  let list = await Person.find({
    $and: [{ age: { $nin: [25] } }, { age: { $gte: 20 } }],
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByOrOperator = asyncHandler(async (req, res) => {
  // $or requires array of conditions
  // returns an all the document that matches any one condition

  let list = await Person.find({
    $or: [
      { age: { $in: [24, 25] } },
      { "company.location.country": { $nin: ["USA", "France"] } },
      { eyeColor: { $nin: ["blue", "brown"] } },
    ],
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByNorOperator = asyncHandler(async (req, res) => {
  // $or requires array of conditions
  // returns an all the document that not matches all the conditions

  let list = await Person.find({
    $nor: [{ age: { $gt: 20 } }],
  });
  //   $nor: [
  //     { age: { $gte: 25 } },
  //     { isActive: false },
  //     { "company.location.country": { $ } },
  //   ],
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByArray = asyncHandler(async (req, res) => {
  // retuns all the documents that contains the string "consequat" as one of its elements
  let queryOne = Person.find({ tags: "consequat" });

  // returns all the documents that contains string "velit" in the third element of an array
  let queryTwo = Person.find({ "tags.2": "velit" });

  // returns all the documents that contains exactly five elements "enim", "id", "velit", "ad", "consequat" in the specified order
  let queryThree = Person.find({
    tags: ["enim", "id", "velit", "ad", "consequat"],
  });

  // returns all the documents that contains both the elements "enim" and "id", without regard to order or other elements in the array
  let queryFour = Person.find({ tags: { $all: ["enim", "id"] } });

  // returns all the documents that length is 3
  let queryFive = Person.find({ tags: { $size: 3 } });

  let [one, two, three, four, five] = await Promise.all([
    queryOne,
    queryTwo,
    queryThree,
    queryFour,
    queryFive,
  ]);
  res
    .status(200)
    .send({ message: "Success", data: { one, two, three, four, five } });
});

export const findByArrayElementMatch = asyncHandler(async (req, res) => {
  // returns all the documents if an atlease one sub document in a array matches all the conditions
  // $elementMatch will be used to query an nested array
  // query will be run on the individual nested array
  // if we use {"friends.age" : 20, "friends.gender" : "male"} here it will run independently means
  // if the gender matches in the first element and the age matched in another element it will still returns the document
  // but in case of $elemMatch if the element matches all the conditions then only it will return the document
  let list = await Person.find({
    friends: { $elemMatch: { age: { $lte: 20 }, gender: { $eq: "male" } } },
  });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByTypeAndExist = asyncHandler(async (req, res) => {
  let bsonIdentifiers = {
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

  // returns all the documents if the field type matches
  let queryOne = Person.find({
    company: { $type: bsonIdentifiers.object },
    tags: { $type: bsonIdentifiers.array },
  }).count();

  // returns all the documents if the field exists
  // note - that field should be defined in the schema
  let queryTwo = Person.find({
    height: { $exists: true },
  }).count();

  let [one, two] = await Promise.all([queryOne, queryTwo]);

  res.status(200).send({ message: "Success", data: { one, two } });
});

export const findAndFilterField = asyncHandler(async (req, res) => {
  // returns all the documents and the documents contains only name and age
  let list = await Person.find({}, { name: 1, age: 1 });
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByRegex = asyncHandler(async (req, res) => {
  let { search } = req.query;

  // returns all the documents that matches the regex
  let list = await Person.find(
    {
      name: { $regex: search, $options: "i" },
    },
    { name: 1, age: 1 }
  );
  let total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

export const findByPageAndLimit = asyncHandler(async (req, res) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 25;

  // sort, skip, limit order of execution will be like this even we change the order in chaining
  // count method result will be based on the query we pass not on the sort, skip, limit
  let list = await Person.find({})
    .sort({ name: 1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);
  let total = await Person.find({}).countDocuments();
  let totalPages = Math.ceil(total / +limit);
  res.status(200).send({
    message: "Success",
    data: { pageMeta: { page, totalPages, total }, list },
  });
});

export const findAndUpdateById = asyncHandler(async (req, res) => {
  let {
    params: { id },
    body,
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send({ message: "Invalid Id" });

  let isExist = await Person.findById(id);

  if (!isExist) return res.status(400).send({ message: "Data Not Found" });

  // $set will replace the filed if exists or add the data if not exist
  let data = await Person.findByIdAndUpdate(id, {
    $set: body,
  });

  res.status(200).send({ message: "Success", data });
});

export const findAndDeleteFieldById = asyncHandler(async (req, res) => {
  let {
    params: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send({ message: "Invalid Id" });

  let isExist = await Person.findById(id);

  if (!isExist) return res.status(400).send({ message: "Data Not Found" });

  // $unset will delete the field in the document
  let data = await Person.findByIdAndUpdate(id, {
    $unset: { height: 1 },
  });

  res.status(200).send({ message: "Success", data });
});

export const findAndRenameFieldById = asyncHandler(async (req, res) => {
  let {
    params: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send({ message: "Invalid Id" });

  let isExist = await Person.findById(id);

  if (!isExist) return res.status(400).send({ message: "Data Not Found" });

  // $rename will rename the field in the document
  // note the new field name shoud defined in the schema so that it will work
  let data = await Person.findByIdAndUpdate(id, {
    $rename: { height: "heights" },
  });

  res.status(200).send({ message: "Success", data });
});
