import { Router } from "express";
import {
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
} from "../controllers/find";

const router = Router();

router.get("/all", findAll);
router.get("/exactMatch", findByExactMatch);
router.get("/exactMatchInNestedObject", findByExactMatchInNestedObject);
router.get("/multipleCondition", findByMultipleCondition);
router.get("/comparision", findByComparision);
router.get("/andOperator", findByAndOperator);
router.get("/orOperator", findByOrOperator);
router.get("/norOperator", findByNorOperator);
router.get("/array", findByArray);
router.get("/arrayElementMatch", findByArrayElementMatch);
router.get("/typeAndExist", findByTypeAndExist);
router.get("/filterField", findAndFilterField);
router.get("/regex", findByRegex);
router.get("/pageAndLimit", findByPageAndLimit);

export default router;
