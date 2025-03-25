import { Router } from "express";
import { CategoryController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";

const categoryRouter = Router();

categoryRouter.get("/get-category", CategoryController.getCategory);
categoryRouter.post(
  "/create-category",
  protect,
  checkRole(["Admin", "Seller"]),
  CategoryController.createCategory
);
categoryRouter.put(
  "/edit-category/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  CategoryController.editCategory
);
categoryRouter.delete(
  "/delete-category/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  CategoryController.deleteCategory
);
export default categoryRouter;
