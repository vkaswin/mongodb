const router = require("express").Router();
const findRoutes = require("./find");
const aggregateRoutes = require("./aggregate");

router.use("/find", findRoutes);
router.use("/aggregate", aggregateRoutes);

module.exports = router;
