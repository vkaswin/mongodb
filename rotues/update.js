const router = require("express").Router({ mergeParams: true });
const {
  updateById,
  deleteFieldById,
  renameFieldById,
  addElementInArray,
  addMultipleElementsInArray,
  updateMany,
} = require("../controllers/update");
const { checkDataExist } = require("../middleware");

router.put("/many", updateMany);
router.use(checkDataExist);
router.put("/:id/id", updateById);
router.put("/:id/deleteFieldById", deleteFieldById);
router.put("/:id/renameFieldById", renameFieldById);
router.put("/:id/addElementInArray", addElementInArray);
router.put("/:id/addMultipleElementsInArray", addMultipleElementsInArray);

module.exports = router;
