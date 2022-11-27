import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send({ message: "Invalid id" });

  // envia o id valido, como paramtro directo da requisicao. A funcao next() podera acessar directamente do req.id
  req.id = id;

  next();
};

export const validUser = async (req, res, next) => {
  const id = req.id;
  const user = await userService.findById(id);
  if (!user) return res.status(400).send({ message: `User ${id} not found` });

  // envia os parametros como requisicao para a funcao next
  req.user = user;
  next();
};
