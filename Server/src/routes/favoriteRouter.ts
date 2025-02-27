import { Router } from "express";
import { FavoriteController } from "../controllers";
import { protect } from "../middleware/protect";

const favoriteRouter = Router();

favoriteRouter.use(protect);
favoriteRouter.get("/get-favorite", FavoriteController.getFavoriteBuyer);
favoriteRouter.post("/add-favorite", FavoriteController.addFavorite);
favoriteRouter.delete(
  "/delete-favorite/:id",
  FavoriteController.deleteFavorite
);
export default favoriteRouter;
