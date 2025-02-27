import favoriteRouter from "./favoriteRouter";
import menuRouter from "./menuRouter";
import categoryRouter from "./categoryRouter";
import vendorRouter from "./vendorRouter";
import authRouter from "./authRouter";

import { Router } from "express";
import userRouter from "./userRouter";

const router = Router();

// API Welcome Message
router.get("/", (_, response) => {
  response.send({
    message: "My-API-Name v0.0.1",
  });
});

/**
 * Insert your router here
 * @example router.use("/example", exampleRouter)
 */
router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/vendors", vendorRouter);
router.use("/categorys", categoryRouter);
router.use("/menus", menuRouter);
router.use("/favorites", favoriteRouter);

export default router;