//   mongoose.connect("mongodb://0.0.0.0:27017/user-registration);
const exprees = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectTOMongoDB = require("./database/mongooseConnection");
const port = process.env.PORT || 8080;

//routes:
const userRoutes = require("./routes/user.route");

const app = exprees();

app.use(exprees.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.listen(port, () => {
  connectTOMongoDB();

  console.log(`server is running on port ${port}...`);
});
