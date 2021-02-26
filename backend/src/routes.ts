import { Router } from "express";
import TodoController from "./controllers/TodoController";


const routes = Router();

routes.get("/todos", TodoController.index);
routes.post("/todos/create", TodoController.create);
routes.patch("/todos/:todoId", TodoController.update);
routes.delete("/todos/:todoId", TodoController.delete);


export default routes;