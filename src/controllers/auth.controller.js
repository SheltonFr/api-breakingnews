import bcrypt from "bcrypt";

import { findByEmail } from "../services/auth.service.js";

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

    res.send("Login Ok");

  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
