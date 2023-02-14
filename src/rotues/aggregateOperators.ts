import { Router } from "express";
import {
  accumulators,
  unaryOperator,
  out,
  filter,
} from "../controllers/aggregateOperators";

const router = Router();

router.get("/accumulators", accumulators);
router.get("/unaryOperator", unaryOperator);
router.get("/out", out);
router.get("/filter", filter);

export default router;
