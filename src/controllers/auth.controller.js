import bcrypt from "bcrypt";


import { findByEmail, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if(!user){
        return res.status(400).send({ message:"Email or password do not match"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid || !user) {
        return res.status(400).send({ message:"Email or password do not match"});
    }

    const token = generateToken(user._id);

    res.send({token});

  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
