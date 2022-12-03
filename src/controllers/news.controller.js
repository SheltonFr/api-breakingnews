import newsService from "../services/news.service.js";
const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const userId = req.userId;
    console.log(userId);

    if (!title || !text || !banner || !userId) {
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
  // pegando query parameters(chegam como string)
  let { limit, offset } = req.query;

  // insere valores padrao, caso nao sejam passados na url
  limit = !limit ? 5 : Number(limit);
  offset = !offset ? 0 : Number(offset);

  try {
    const news = await newsService.findAll(offset, limit);
    const total = await newsService.countNews();
    const currentUrl = req.baseUrl; // pega a url de requisicao(no caso: /news)

    const nextOffset = offset + limit;
    const previous = offset - limit < 0 ? null : offset - limit;
    const nextUrl =
      nextOffset < total
        ? `${currentUrl}?limit=${limit}&offset=${nextOffset}`
        : null;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    res.status(201).send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      // retornara uma lista de campos para cada news
      result: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        postedAt: item.createdAt,
        comments: item.comments,
        userName: item.user.username,
        name: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await newsService.topNews();

    if (!news)
      return res.status(400).send({ message: "There is not a top news" });

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        postedAt: news.createdAt,
        comments: news.comments,
        userName: news.user.username,
        name: news.user.name,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
export default { create, findAll, topNews };
