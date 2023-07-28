import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017/iNotebook";

const options = {
  family: 4,
};

const connectToMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURI, options)
      .then(() => {
        console.log("Mongoose Connected Successfully");
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default connectToMongo;
