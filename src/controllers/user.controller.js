const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body; // passa o corpo de requisicao(JSON)

  if (!name || !username || !email || !password || !avatar || !background) {
    // casp de campo nao preenchido
    return res
      .status(400)
      .send({ message: "Submit all fields to registration" });
  }

  const user = await userService.create(req.body);

  // so será executado , depois da resposta de criacao do user
  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }
  res.status(201).send({
    message: "User created successfully!",

    user: {
      id: user._id, // criado automaticamente pelo mongodb Altlas
      name,
      username,
      email,
      avatar,
      background,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAll();

  if (users.length === 0)
    return res.status(400).send({ message: "There are no registered users!" });

  return res.send(users);
};

const findById = async (req, res) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({message: 'Invalid id'});

  const user = await userService.findById(id);

  if (!user) return res.status(400).send({ message: `User ${id} not found` });

  return res.send(user);
};

module.exports = { create, findAll, findById };
