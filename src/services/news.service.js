import mongoose from "mongoose";
import News from "../models/News.js";
import User from "../models/User.js";

const create = (body) => News.create(body);

const findAll = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const findById = (id) => News.findById(id).populate("user");

const countNews = () => News.count();

const topNews = () => News.findOne().sort({ _id: -1 }).populate("user");

const searchByTitle = (title) =>
  News.find({
    // i - case insensitive
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const findByUser = (userId) =>
  News.find({
    user: userId,
  })
    .sort({ _id: -1 })
    .populate("user");

const update = (idNews, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { title, text, banner },
    { rowResult: true }
  );

export default {
  create,
  findAll,
  countNews,
  topNews,
  findById,
  searchByTitle,
  findByUser,
  update,
};
