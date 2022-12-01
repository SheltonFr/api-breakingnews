import newsService from "../services/news.service.js";
import { ObjectId } from "mongoose";
const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if(!title || !text || !banner){
        return res.status(400).send({ message: "Submit all filds for registration!" });
    }

    await newsService.create({
        title,
        text,
        banner,
        user: {_id: '6388d688a7ddfb79746270a1'}
    });

    res.status(201).send("Created");
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

const findAll = async (req, res) => {
  const news = await newsService.findAll();
  res.status(201).send(news);
};

export default { create, findAll };
