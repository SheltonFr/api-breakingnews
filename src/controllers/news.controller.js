import newsService from "../services/news.service.js";
const create = async (req, res) => {
  try {
    
    const { title, text, banner } = req.body;
    const userId = req.userId;

    if (!title || !text || !banner) {
      return res
        .status(400)
        .send({ message: "Submit all filds for registration!" });
    }

    await newsService.create({
      title,
      text,
      banner,
      user: userId,
    });

    res.status(201).send("Created");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const news = await newsService.findAll();
  res.status(201).send(news);
};

export default { create, findAll };
