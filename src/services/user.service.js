const User = require("../models/User");

const create = (body) => {
  /** create() -> metodo do mongoose que cria um scheema dentro do padrao ja definido */
  return User.create(body);
  
};

const findAll = () => User.find();

const findById = (id) => User.findById(id);

module.exports = { create, findAll, findById };

