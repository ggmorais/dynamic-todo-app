import { Request, Response } from "express";
import db from "../database/connection";


interface Todo {
  description: string;
  is_done?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

class TodoController {
  async index(req: Request, res: Response) {
    const todos = await db("todos").select<Todo[]>();

    return res.json({
      data: todos
    });
  }

  async create(req: Request, res: Response) {
    const { description } = req.body;

    const todo: Todo = {
      description: description
    }

    try {
      const trx = await db.transaction();

      const id = await trx("todos").insert(todo);

      await trx.commit();

      return res.json({
        done: true,
        id: id,
        message: "TODO item created successfully."
      });
    } catch (e) {
      console.log(`Error: ${e}`);

      return res.json({
        done: false,
        message: "An error occurred."
      });
    }
  }

  async update(req: Request, res: Response) {
    const { todoId } = req.params;
    const { description, is_done } = req.body;

    const todo = {
      description: description,
      is_done: is_done,
      updated_at: db.fn.now()
    }

    try {
      const trx = await db.transaction();

      await trx("todos").where("id", "=", todoId).update(todo);

      await trx.commit();

      return res.json({
        done: true,
        message: "TODO item updated successfully."
      });
    } catch (e) {
      console.log(`Error: ${e}`);

      return res.json({
        done: false,
        message: "An error occurred."
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { todoId } = req.params;

    try {
      const trx = await db.transaction();

      await trx("todos").del().where("id", "=", Number(todoId));

      await trx.commit();

      return res.json({
        done: true,
        message: "TODO item deleted successfully."
      });
    } catch (e) {
      console.log(`Error: ${e}`);

      return res.json({
        done: false,
        message: "An error occurred."
      });
    }
  }
}


export default new TodoController();