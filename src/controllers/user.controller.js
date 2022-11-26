const userService = require("../services/user.service");

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

  /* O middleware validId verificou o id do parametro, passou para o validUser, e o validUser passa como parametro da req, o user encontrado */
  const user = req.user;
  return res.send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name && !username && !email && !password && !avatar && !background) {
    return res
      .status(400)
      .send({ message: "Submit at least one field to update" });
  }

  const {id, user} = req;
  await userService.update(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "User updated successfully" });
};

module.exports = { create, findAll, findById, update };
