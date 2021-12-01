import Router from "express";
const router = Router();
import aboutUsRouter from "./aboutUs";
router.use("/aboutUs", aboutUsRouter);
export default router;



