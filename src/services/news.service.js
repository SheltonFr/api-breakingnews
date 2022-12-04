import mongoose from "mongoose";
import News from "../models/News.js";
import User from "../models/User.js";

const create = (body) => News.create(body);

const findAll = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const findById = (id) => News.findById(id).populate("user");

const countNews = () => News.count();

const topNews = () => News.findOne().sort({ _id: -1 }).populate("user");

export default { create, findAll, countNews, topNews, findById };
