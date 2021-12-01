import Router from "express";
import payment from '../controllers/payment';
const router = Router();
router.get("/createSubscription",payment.createSubscription);
router.post("/createPlan",payment.createPlan);
module.exports = router;