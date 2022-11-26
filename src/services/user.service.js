const User = require("../models/User");

const create = (body) => {
  /** create() -> metodo do mongoose que cria um scheema dentro do padrao ja definido */
  return User.create(body);
};

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const update = (id, name, username, email, password, avatar, background) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );

module.exports = { create, findAll, findById, update };
