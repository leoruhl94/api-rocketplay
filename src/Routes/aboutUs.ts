import Router from "express";
import aboutUs from "../controllers/aboutUs";
const router = Router();
router.use("/", aboutUs);

export default router;
