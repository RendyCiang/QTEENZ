import { Router } from "express";
import { MenuController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";

const menuRouter = Router();

menuRouter.get("/get-menu", MenuController.getMenu);
menuRouter.post(
  "/create-menu",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.createMenu
);
menuRouter.put(
  "/edit-menu/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.editMenu
);
menuRouter.delete(
  "/delete-menu/:id",
  protect,
  checkRole(["Admin", "Seller"]),
  MenuController.deleteMenu
);

export default menuRouter;
