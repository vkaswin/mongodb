const router = require("express").Router();
const {
  accumulators,
  unaryOperator,
  out,
  filter,
} = require("../controllers/aggregateOperators");

router.get("/accumulators", accumulators);
router.get("/unaryOperator", unaryOperator);
router.get("/out", out);
router.get("/filter", filter);

module.exports = router;
