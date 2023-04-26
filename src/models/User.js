import mongoose from "mongoose";
import bcrypt from "bcrypt";

// configurando a o documetn do user ("""""""Tabela""""""")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // para que na seja retornada nas consultas a base de dados
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
});

/* Criptografia de password */

// pre() -> funcao a ser executada antes de se armazenar o registro
UserSchema.pre('save', async function (next) {
    /* o argumento numerico representa o numero de rodadas de hash. remomenda-se que nao seja inferior a 10 */
    this.password = await bcrypt.hash(this.password, 10);


    /*  A Criptografia leva certo tempo, porem é necessario que ela termine, para poder se efectuar 
    a persistencia do registro na base de dados. ou seja, é uma funcao assincrona, que deve ser concluida
    antes de se realizar o proimo passo(salvar)*/

    next();
});



const User = mongoose.model("User", UserSchema);

export default User;