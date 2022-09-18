const router = require("express").Router();
const { findAll } = require("../controllers");

router.get("/findAll", findAll);

module.exports = router;
