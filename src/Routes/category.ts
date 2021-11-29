import category from '../controllers/category';
import Router from "express";
const router = Router();
router.get('/', category.getCategories);
router.post('/', category.addCategory);
module.exports = router;