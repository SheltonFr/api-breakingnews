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

    res.send({
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

const findById = async (req, res) => {
  const news = req.news;
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
};

const searchByTitle = async (req, res) => {
  try {
    // o titulo sera recebido atraves de query parameters
    const { title } = req.query;
    const news = await newsService.searchByTitle(title);

    if (news.length === 0)
      return res
        .status(400)
        .send({ message: `There are not news with this title!` });

    res.send({
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
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const byUser = async (req, res) => {
  try {
    const userId = req.userId;
    const news = await newsService.findByUser(userId);

    if (news.length === 0)
      return res.send({ message: `This user has not new avalables` });

    res.send({
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
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title && !text && !banner)
      return res
        .status(404)
        .send({ message: "Submit at least one field to update" });

    const newsId = req.id;
    await newsService.update(id, title, text, banner);
    res.send({ message: "News updated successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.id;
    await newsService.deleteById(id);
    res.send({ message: "News deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const likeNews = async (req, res) => {
  try {
    const newsId = req.id;
    const userId = req.userId;
    const likedNews = await newsService.likeNews(newsId, userId);

    if (!likedNews) {
      await newsService.deleteLike(newsId, userId);
      return res.status(200).send({ message: "Like removed successfully!" });
    }

    res.status(200).send({ message: "Liked setted successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addComments = async (req, res) => {
  try {
    const newsId = req.id;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment)
      return res.status(400).send({ message: "Write a message to comment!" });

    await newsService.addComments(newsId, comment, userId);

    res.send({ message: "Comment added successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteComments = async (req, res) => {
  try {
    const newsId = req.id;
    const commentId = req.params.commentId;
    const userId = req.userId;

    const updatedNews = await newsService.deleteComments(
      newsId,
      commentId,
      userId
    );

  
    const comment = updatedNews.comments.find(item => item.commentId === commentId);
    if(comment !== undefined) return res.status(400).send({ message: "You cant delete this comment!" });
  
   

    res.send({ message: "Comment removed successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  deleteById,
  likeNews,
  addComments,
  deleteComments,
};
