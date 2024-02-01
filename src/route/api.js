import express from "express";
import userController from "../controller/user-controller.js";
import raossundaController from "../controller/raossunda-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// user api
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// raossunda api
userRouter.post("/api/raossundas", raossundaController.create);
userRouter.get("/api/raossundas/:raossundaId", raossundaController.create);
userRouter.put("/api/raossundas/:raossundaId", raossundaController.update);
userRouter.delete("/api/raossundas/:raossundaId", raossundaController.remove);
userRouter.get("/api/raossundas", raossundaController.search);

export { userRouter };
