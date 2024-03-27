// exports.up = function(knex) {}
exports.up = knex => knex.schema.createTable("notes_links", table => {
  table.increments("id");
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.text("url").notNullable();
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("notes_links");
// exports.down = function(knex) {}

