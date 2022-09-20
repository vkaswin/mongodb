const mongoose = require("mongoose");

const personSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    registered: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    eyeColor: {
      type: String,
      required: true,
    },
    favoriteFruit: {
      type: String,
      required: true,
    },
    company: {
      type: {
        title: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        location: {
          type: {
            country: {
              type: String,
              required: true,
            },
            address: {
              type: String,
              required: true,
            },
          },
          _id: false,
        },
      },
      _id: false,
    },
    tags: { type: [String], default: [] },
    friends: {
      type: [Object],
      default: [],
    },
    height: String,
    marks: [Number],
  },
  { timestamps: true, collection: "persons" }
);

const Person = mongoose.model("Person", personSchema);

module.exports = {
  Person,
};
