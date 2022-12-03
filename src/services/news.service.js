import mongoose from "mongoose";
import News from "../models/News.js";
import User from "../models/User.js";

const create = (body) => News.create(body);

const findAll = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => News.count();

export default { create, findAll, countNews };
