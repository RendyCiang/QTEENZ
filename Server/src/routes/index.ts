import orderRouter from "./orderRouter";
import midtransRouter from "./midtransRouter";
import requestRouter from "./requestRouter";
import favoriteRouter from "./favoriteRouter";
import menuRouter from "./menuRouter";
import categoryRouter from "./categoryRouter";
import vendorRouter from "./vendorRouter";
import authRouter from "./authRouter";

import { Router } from "express";
import userRouter from "./userRouter";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cloudinaryRouter from "./cloudinaryRouter";
import reviewRouter from "./reviewRouter";
import historyRouter from "./historyRouter";

dotenv.config();

const router = Router();
router.use(cors());
router.use(express.json());

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
router.use("/requests", requestRouter);
router.use("/midtranss", midtransRouter);
router.use("/orders", orderRouter);
router.use("/cloudinary", cloudinaryRouter);
router.use("/reviews", reviewRouter);
router.use("/history", historyRouter);
export default router;
