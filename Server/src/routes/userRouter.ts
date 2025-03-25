import { Router } from "express";
import { UserController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";
import { Role } from "@prisma/client";

const userRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
userRouter.use(protect);
userRouter.get("/get-user", checkRole(["Admin"]), UserController.getUser);
userRouter.get("/get-user/:id", UserController.getProfile);
userRouter.put("/edit-user/:id", UserController.editUser);
userRouter.delete(
  "/delete-user/:id",
  checkRole(["Admin"]),
  UserController.deleteUser
);

export default userRouter;
