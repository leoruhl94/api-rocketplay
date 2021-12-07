const { Router } = require("express");
const PlansService = require("../services/plansService");
const router = Router();
const { Plans } = require("../libs/sequelize");

let plansService = new PlansService();

router.post("/", async (req, res) => {
  const { reason, transaction_amount, back_url, description, userLimit } =
    req.body;
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
router.get("/", async (req, res) => {
  try {
    let plans = await Plans.findAll()
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
