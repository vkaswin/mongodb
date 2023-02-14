import { Router } from "express";
import findRoutes from "./find";
import aggregateOperatorsRoutes from "./aggregateOperators";
import updateRoutes from "./update";
import aggregateStagesRoutes from "./aggregateOperators";

const router = Router();

router
  .use("/find", findRoutes)
  .use("/update", updateRoutes)
  .use("/aggregate/operators", aggregateOperatorsRoutes)
  .use("/aggregate/stages", aggregateStagesRoutes);

export default router;
