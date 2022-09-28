const router = require("express").Router();
const findRoutes = require("./find");
const aggregateOperatorsRoutes = require("./aggregateOperators");
const updateRoutes = require("./update");
const aggregateStagesRoutes = require("./aggregateStages");

router
  .use("/find", findRoutes)
  .use("/update", updateRoutes)
  .use("/aggregate/operators", aggregateOperatorsRoutes)
  .use("/aggregate/stages", aggregateStagesRoutes);

module.exports = router;
