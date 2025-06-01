import { Router } from "express";
import { ReviewController } from "../controllers";
import { protect } from "../middleware/protect";
import { checkRole } from "../middleware/checkRole";

const reviewRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
reviewRouter.get("/get-review", ReviewController.getAllReviews);
reviewRouter.post(
  "/create-review/:orderId",
  protect,
  ReviewController.createReview
);
reviewRouter.get(
  "/get-review-admin",
  protect,
  checkRole(["Admin"]),
  ReviewController.getReviewAdmin
);
reviewRouter.get("/get-review/:id", ReviewController.getVendorReviewById);
reviewRouter.post(
  "/delete-review/:reviewId",
  protect,
  checkRole(["Admin"]),
  ReviewController.deleteReview
);
export default reviewRouter;
