import Person from "../models/person";
import { asyncHandler } from "../utils";

export const updateById = asyncHandler(async (req, res) => {
  // $set will replace the filed if exists or add the data if not exist
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });

  res.status(200).send({ message: "Success", data });
});

export const deleteFieldById = asyncHandler(async (req, res) => {
  // $unset will delete the field in the document
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $unset: { height: 1 },
  });

  res.status(200).send({ message: "Success", data });
});

export const renameFieldById = asyncHandler(async (req, res) => {
  // $rename will rename the field in the document
  // note the new field name shoud defined in the schema so that it will work
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $rename: { height: "heights" },
  });

  res.status(200).send({ message: "Success", data });
});

export const addElementInArray = asyncHandler(async (req, res) => {
  // add one element in an array
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $push: { tags: "Loreum" },
  });

  res.status(200).send({ message: "Success", data });
});

export const addMultipleElementsInArray = asyncHandler(async (req, res) => {
  // add multiple elements in a array
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $push: { tags: { $each: ["Ispum", "Loreum"] } },
  });

  res.status(200).send({ message: "Success", data });
});

export const updateMany = asyncHandler(async (req, res) => {
  // filter all the documents that matches the query and updates the value
  let data = await Person.updateMany(
    {
      _id: { $in: ["632835b5d153ed22fe9ba479", "632835b5d153ed22fe9ba47a"] },
    },
    {
      $push: { tags: { $each: ["Ispum", "Loreum"] } },
    }
  );

  res.status(200).send({ message: "Success", data });
});

export const addElementInArrayUsingAddToSet = asyncHandler(async (req, res) => {
  // add element in an array
  // $addToSet will push an element in an array if the element doesn't exists so will no add duplicate elements in an array
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $addToSet: { tags: { $each: ["Aswin", "Kumar"] } },
  });

  res.status(200).send({ message: "Success", data });
});

export const removeElementInArrayUsingPop = asyncHandler(async (req, res) => {
  // remove array element in an array
  // if we pass 1 it will remove last element in an array and if we pass -1 it will remove first element in an array
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $pop: { tags: 1 },
  });

  res.status(200).send({ message: "Success", data });
});

export const removeElementInArrayUsingPull = asyncHandler(async (req, res) => {
  // removes all the elements that matches the query
  let data = await Person.findByIdAndUpdate(req.params.id, {
    $pull: { marks: { $gte: 30, $lt: 40 } },
  });

  res.status(200).send({ message: "Success", data });
});

export const removeElementInArrayUsingPullAll = asyncHandler(
  async (req, res) => {
    // pass an array in $pullAll method and it will remove all the elements in the array
    let data = await Person.findByIdAndUpdate(req.params.id, {
      $pullAll: { tags: ["Loreum", "Ispum"] },
    });

    res.status(200).send({ message: "Success", data });
  }
);

export const updateArrayUsingPositionalOperator = asyncHandler(
  async (req, res) => {
    let data = await Person.updateOne(
      {
        _id: req.params.id,
        friends: { $elemMatch: { name: "Aswin" } },
      },
      {
        "friends.$.name": "Thor",
      }
    );

    res.status(200).send({ message: "Success", data });
  }
);
