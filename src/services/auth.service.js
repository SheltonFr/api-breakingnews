import User from "../models/User.js";
import Jwt  from "jsonwebtoken";

/* select('+atributo') para selecionar atributo marcado como nao selecionavel */
const findByEmail = (email) => User.findOne({email: email}).select('+password');

const generateToken = (id) => Jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400}); // expirar em 24h e cria novo


export {findByEmail, generateToken};