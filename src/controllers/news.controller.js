import newsService from "../services/news.service.js";

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
        id: "ObjectOdFake1",
    });

    res.status(201).send("Ok");
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

const findAll = async (req, res) => {
  const news = await newsService.findAll();
  res.status(201).send(news);
};

export default { create, findAll };
