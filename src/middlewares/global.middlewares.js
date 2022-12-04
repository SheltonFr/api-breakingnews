import mongoose from "mongoose";
import userService from "../services/user.service.js";
import newsService from "../services/news.service.js";

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

export const validNews = async (req, res, next) => {
  try {
    const id = req.id;
    const news = await newsService.findById(id);
    if (!news) return res.status(400).send({ message: `News ${id} not found` });
    req.news = news;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const verifyNewsOwner = async (req, res, next) => {
  try {
    const { id, news, userId } = req;

    if (!userId.equals(news.user._id))
      return res
        .status(401)
        .send({ message: "Only the owner can perform this action!" });

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
