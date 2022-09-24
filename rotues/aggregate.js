const router = require("express").Router();
const {
  match,
  sort,
  group,
  project,
  unwind,
  count,
  accumulators,
  unaryOperator,
  out,
  filter,
} = require("../controllers/aggregate");

router.get("/match", match);
router.get("/sort", sort);
router.get("/group", group);
router.get("/project", project);
router.get("/unwind/:id", unwind);
router.get("/count", count);
router.get("/accumulators", accumulators);
router.get("/unaryOperator", unaryOperator);
router.get("/out", out);
router.get("/filter", filter);

module.exports = router;
