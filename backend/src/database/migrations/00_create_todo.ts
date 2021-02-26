import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("todos", table => {
    table.increments("id").primary();
    table.string("description").notNullable();
    table.boolean("is_done").notNullable().defaultTo(false);
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("todo");
}