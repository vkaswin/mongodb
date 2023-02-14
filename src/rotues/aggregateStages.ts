import { Router } from "express";
import {
  match,
  sort,
  group,
  project,
  unwind,
  count,
  addFields,
  facet,
  skipAndLimit,
  unset,
  set,
  sortByCount,
} from "../controllers/aggregateStages";

const router = Router();

router.get("/match", match);
router.get("/sort", sort);
router.get("/group", group);
router.get("/project", project);
router.get("/unwind/:id", unwind);
router.get("/count", count);
router.get("/addFields", addFields);
router.get("/facet", facet);
router.get("/skipAndLimit", skipAndLimit);
router.get("/unset", unset);
router.get("/set", set);
router.get("/sortByCount", sortByCount);

export default router;
