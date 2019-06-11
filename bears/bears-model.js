const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("bears");
}

function findById(id) {
  return db("bears")
    .where({ id })
    .first(); // grabs first element of array;
}

function add(bear) {
  return db("bears")
    .insert(bear)
    .then(ids => {
      const [id] = ids;

      return db("bears")
        .where({ id })
        .first();
    });
}

function update(id, changes) {
  return db("bears")
    .where({ id })
    .update(changes)
    .then(() => {
      return db("bears")
        .where({ id })
        .first();
    });
}

function remove(id) {
  return db("bears")
    .where({ id })
    .del();
}
