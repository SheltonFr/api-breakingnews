const create = (req, res) => {
  const { name, username, email, password, avatar, background } = req.body; // passa o corpo de requisicao(JSON)

  if (!name || !username || !email || !password || !avatar || !background) {
    // casp de campo nao preenchido
    res.status(400).send({message: 'Submit all fields to registration'});
  }

  res.status(201).send({
    message : "User created successfully",

    user : {
        name,
        username,
        email,
        avatar,
        background
    } 
    
  });
};

module.exports = { create };
