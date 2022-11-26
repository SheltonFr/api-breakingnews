import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait for database connection...");

  mongoose
    .connect(
      "mongodb+srv://root:root@cluster0.gkiryki.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Mongodb Atlas Connected!"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
