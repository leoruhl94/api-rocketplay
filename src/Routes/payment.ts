import Router from "express";
import payment from '../controllers/payment';
const router = Router();
router.post("/",payment.generatePayment);
module.exports = router;