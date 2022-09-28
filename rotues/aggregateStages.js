const router = require("express").Router();
const {
  match,
  sort,
  group,
  project,
  unwind,
  count,
  addFields,
  facet,
} = require("../controllers/aggregateStages");

router.get("/match", match);
router.get("/sort", sort);
router.get("/group", group);
router.get("/project", project);
router.get("/unwind/:id", unwind);
router.get("/count", count);
router.get("/addFields", addFields);
router.get("/facet", facet);

module.exports = router;
