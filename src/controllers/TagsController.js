const knex = require("../database/knex");

class TagsController {

  async index(req, res) {
    const  user_id  = req.user.id;

    const tags = await knex("notes_tags")
      .where({ user_id })
      // groupBy recurso de banco de dados que irá agrupar dados repetidos
      .groupBy("name")

    return res.json(tags);
  }
}

module.exports = TagsController;