const { Person } = require("../models");

const updateById = async (req, res) => {
  try {
    // $set will replace the filed if exists or add the data if not exist
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $set: body,
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const deleteFieldById = async (req, res) => {
  try {
    // $unset will delete the field in the document
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $unset: { height: 1 },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const renameFieldById = async (req, res) => {
  try {
    // $rename will rename the field in the document
    // note the new field name shoud defined in the schema so that it will work
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $rename: { height: "heights" },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const addElementInArray = async (req, res) => {
  try {
    // add one element in an array
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $push: { tags: "Loreum" },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const addMultipleElementsInArray = async (req, res) => {
  try {
    // add multiple elements in a array
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $push: { tags: { $each: ["Ispum", "Loreum"] } },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const updateMany = async (req, res) => {
  try {
    // filter all the documents that matches the query and updates the value
    const data = await Person.updateMany(
      {
        _id: { $in: ["632835b5d153ed22fe9ba479", "632835b5d153ed22fe9ba47a"] },
      },
      {
        $push: { tags: { $each: ["Ispum", "Loreum"] } },
      }
    );

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const addElementInArrayUsingAddToSet = async (req, res) => {
  try {
    // add element in an array
    // $addToSet will push an element in an array if the element doesn't exists so will no add duplicate elements in an array
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $addToSet: { tags: { $each: ["Aswin", "Kumar"] } },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const removeElementInArrayUsingPop = async (req, res) => {
  try {
    // remove array element in an array
    // if we pass 1 it will remove last element in an array and if we pass -1 it will remove first element in an array
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $pop: { tags: 1 },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const removeElementInArrayUsingPull = async (req, res) => {
  try {
    // removes all the elements that matches the query
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $pull: { marks: { $gte: 30, $lt: 40 } },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const removeElementInArrayUsingPullAll = async (req, res) => {
  try {
    // pass an array in $pullAll method and it will remove all the elements in the array
    const data = await Person.findByIdAndUpdate(req.params.id, {
      $pullAll: { tags: ["Loreum", "Ispum"] },
    });

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const updateArrayUsingPositionalOperator = async (req, res) => {
  try {
    const data = await Person.updateOne(
      {
        _id: req.params.id,
        friends: { $elemMatch: { name: "Aswin" } },
      },
      {
        "friends.$.name": "Thor",
      }
    );

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  updateById,
  deleteFieldById,
  renameFieldById,
  addElementInArray,
  addMultipleElementsInArray,
  updateMany,
  addElementInArrayUsingAddToSet,
  removeElementInArrayUsingPop,
  removeElementInArrayUsingPull,
  removeElementInArrayUsingPullAll,
  updateArrayUsingPositionalOperator,
};
