const { Router } = require("express");
const PlansService = require("../services/plansService");
const router = Router();

let plansService = new PlansService();

router.post("/", async (req, res, next) => {
  const { reason, transaction_amount, back_url, description, userLimit } =
    req.boby;
  try {
    const response = await plansService.createPlan(
      reason,
      transaction_amount,
      back_url,
      description,
      userLimit
    );
    res.status(200).json('Plan created succesfully');
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params; // 2c9380847d7c2d8f017d7d7c7503010c
  try {

    res.status(200).json(id);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
