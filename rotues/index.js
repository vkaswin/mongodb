const router = require("express").Router();
const findRoutes = require("./find");
const aggregateRoutes = require("./aggregate");
const updateRoutes = require("./update");

router
  .use("/find", findRoutes)
  .use("/update", updateRoutes)
  .use("/aggregate", aggregateRoutes);

module.exports = router;
