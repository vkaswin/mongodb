const router = require("express").Router();
const {
  findAll,
  findByExactMatch,
  findByExactMatchInNestedObject,
  findByMultipleCondition,
  findByComparision,
  findByAndOperator,
  findByOrOperator,
  findByNorOperator,
  findByArray,
  findByArrayElementMatch,
  findByTypeAndExist,
  findAndFilterField,
  findByRegex,
  findByPageAndLimit,
} = require("../controllers");

router.get("/findAll", findAll);
router.get("/findByExactMatch", findByExactMatch);
router.get("/findByExactMatchInNestedObject", findByExactMatchInNestedObject);
router.get("/findByMultipleCondition", findByMultipleCondition);
router.get("/findByComparision", findByComparision);
router.get("/findByAndOperator", findByAndOperator);
router.get("/findByOrOperator", findByOrOperator);
router.get("/findByNorOperator", findByNorOperator);
router.get("/findByArray", findByArray);
router.get("/findByArrayElementMatch", findByArrayElementMatch);
router.get("/findByTypeAndExist", findByTypeAndExist);
router.get("/findAndFilterField", findAndFilterField);
router.get("/findByRegex", findByRegex);
router.get("/findByPageAndLimit", findByPageAndLimit);

module.exports = router;
