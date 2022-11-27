import User from "../models/User.js";


/* select('+atributo') para selecionar atributo marcado como nao selecionavel */
const findByEmail = (email) => User.findOne({email: email}).select('+password');


export {findByEmail};