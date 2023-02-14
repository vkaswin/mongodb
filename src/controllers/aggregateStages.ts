import Person from "../models/person";
import mongoose from "mongoose";
import { asyncHandler } from "../../utils";

const match = asyncHandler(async (req, res) => {
  // $match : This resembles queries, where the list of documents is narrowed down through a set of criteria
  // This is equivalent to Person.find({ age: { $lte : 25 } })

  const list = await Person.aggregate([{ $match: { age: { $lte: 25 } } }]);
  const total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

const sort = asyncHandler(async (req, res) => {
  // $sort :  You can reorder documents based on a chosen field -1 will sort in decending order and 1 will sort in ascending order
  // $sort : we can sort by multiple keys as well
  /*
        the below query first will return all the document that matches the $match query then it will sort
        the documents in by name in decending order and then it will sort all the 
        documents again by eyeColor in decending order in case if multiple eyeColor field have same value then only it will 
        look for favoriteFruit and it will sort all the documents having same eyeColor value by favoriteFruit in descending order
      */

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
});

const group = asyncHandler(async (req, res) => {
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

  const list = await Person.aggregate([
    {
      $group: { _id: { eyeColor: "$eyeColor", age: "$age" } },
    },
  ]);
  const total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

const project = asyncHandler(async (req, res) => {
  // $project : The ability to change the structure of documents means you can remove or rename certain fields, or perhaps rename or group fields within an embedded document for legibility
  // project will be used to filter the value if we pass 1 it will return that field in the doucments
  // and 0 will not return the field in the documents also we can restructure the document as well

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
});

const unwind = asyncHandler(async (req, res) => {
  // $unwind splits each document with specified array to several doucments - one document per array element
  // if tags array has 3 elements then it will return three documents for each element in a array

  const list = await Person.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $unwind: "$friends",
    },
    { $match: { "friends.id": { $in: [0, 1] } } },
  ]);
  const total = list.length;
  res.status(200).send({ message: "Success", data: { total, list } });
});

const count = asyncHandler(async (req, res) => {
  // $count returns the total number of documents as an object with the specified key name

  const total = await Person.aggregate([
    { $match: { age: { $lte: 24 } } },
    { $count: "totalDocuments" },
  ]);
  res.status(200).send({ message: "Success", data: { total } });
});

const addFields = asyncHandler(async (req, res) => {
  // $addFields adds new fields in the documents that matches the conditon
  // note this will not add the new field in the database
  // $sum used to add multiple numbers
  // $multiple used to multiple multiple numbers
  // $round used to round off the number to specified decimal
  // $concatArrays used to merge array
  const list = await Person.aggregate([
    { $match: { eyeColor: "blue" } },
    {
      $addFields: {
        tagsCount: { $size: "$tags" },
        friendsCount: { $size: "$friends" },
        randomAge: {
          $round: [{ $sum: [{ $multiply: [{ $rand: {} }, "$age"] }, 10] }, 2],
        },
        "person.detail": {
          name: "$name",
          age: "$age",
        },
        newTags: {
          $concatArrays: [
            "$tags",
            ["loreum", "ispum"],
            ["loreum", "ispum"],
            "$friends",
          ],
        },
      },
    },
  ]);
  res.status(200).send({ message: "Success", list });
});

const facet = asyncHandler(async (req, res) => {
  const list = await Person.aggregate([
    {
      $facet: {
        eyeColorBlue: [
          { $match: { eyeColor: "blue", isActive: true } },
          { $project: { favoriteFruit: 1 } },
        ],
        eyeColorByBrown: [
          { $match: { eyeColor: "brown", isActive: true } },
          { $project: { age: 1 } },
        ],
        eyeColorByGreen: [
          { $match: { eyeColor: "green", isActive: true } },
          { $project: { tags: 1 } },
        ],
      },
    },
  ]);

  res.status(200).send({ message: "Success", list });
});

const skipAndLimit = asyncHandler(async (req, res) => {
  // $limit it limits the number of documents passed to the next stage in the pipeline
  // $skip it skips the number of documents passed to the next stage in the pipeline

  const { page = 1, size = 10 } = req.query;
  const list = await Person.aggregate([
    { $match: { age: { $lte: 22 } } },
    { $sort: { name: 1 } },
    { $skip: (+page - 1) * +size },
    {
      $limit: +size,
    },
    {
      $project: {
        name: 1,
      },
    },
  ]);
  const [{ total }] = await Person.aggregate([
    { $match: { age: { $lte: 22 } } },
    { $count: "total" },
  ]);
  const totalPages = Math.ceil(total / +size);
  res.status(200).send({
    message: "Success",
    data: { pageMeta: { page, total, totalPages }, list },
  });
});

const unset = asyncHandler(async (req, res) => {
  // $unset it will remove or excludes the fields in the document

  const list = await Person.aggregate([
    { $match: { age: { $lte: 22 } } },
    { $sort: { name: 1 } },
    { $unset: "isActive" },
    { $unset: ["friends.id", "company.location.address", "tags"] },
  ]);
  const total = list.length;
  res.status(200).send({
    message: "Success",
    data: { total, list },
  });
});

const set = asyncHandler(async (req, res) => {
  // $set similar to $addFields

  const list = await Person.aggregate([
    { $match: { age: { $lte: 22 } } },
    { $sort: { name: 1 } },
    {
      $set: {
        randomAge: {
          $round: [{ $sum: [{ $multiply: [{ $rand: {} }, "$age"] }, 10] }, 2],
        },
      },
    },
    { $project: { name: 1, randomAge: 1 } },
  ]);
  const total = list.length;
  res.status(200).send({
    message: "Success",
    data: { total, list },
  });
});

const sortByCount = asyncHandler(async (req, res) => {
  const list = await Person.aggregate([{ $sortByCount: "$eyeColor" }]);
  res.status(200).send({
    message: "Success",
    list,
  });
});

export {
  match,
  sort,
  group,
  project,
  unwind,
  count,
  addFields,
  facet,
  skipAndLimit,
  unset,
  set,
  sortByCount,
};
