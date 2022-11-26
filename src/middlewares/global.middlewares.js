import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send({ message: "Invalid id" });

  next();
};

export const validUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.findById(id);
  if (!user) return res.status(400).send({ message: `User ${id} not found` });

  // envia os parametros como requisicao para a funcao next
  req.id = id;
  req.user = user;
  next();
};
