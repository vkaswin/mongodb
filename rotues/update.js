const router = require("express").Router();
const {
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
} = require("../controllers/update");
const { checkDataExist } = require("../middleware");

router.param("id", checkDataExist);
router.put("/many", updateMany);
router.put("/:id/id", updateById);
router.put("/:id/deleteFieldById", deleteFieldById);
router.put("/:id/renameFieldById", renameFieldById);
router.put("/:id/addElementInArray", addElementInArray);
router.put("/:id/addMultipleElementsInArray", addMultipleElementsInArray);
router.put(
  "/:id/addElementInArrayUsingAddToSet",
  addElementInArrayUsingAddToSet
);
router.put("/:id/removeElementInArrayUsingPop", removeElementInArrayUsingPop);
router.put("/:id/removeElementInArrayUsingPull", removeElementInArrayUsingPull);
router.put(
  "/:id/removeElementInArrayUsingPullAll",
  removeElementInArrayUsingPullAll
);
router.put(
  "/:id/updateArrayUsingPositionalOperator",
  updateArrayUsingPositionalOperator
);

module.exports = router;
