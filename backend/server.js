const express = require("express");

// const colors = require("colors");
// const cors = require("cors");
// require("dotenv").config();
// const { graphqlHTTP } = require("express-graphql");
// const schema = require("./schema/schema.js");
// const connectDB = require("./config/db");
const port = process.env.PORT || 3000;
const path = require("path");
const filePath = path.join(__dirname, "../public");

const app = express();

// Connect to database
// connectDB();

// app.use(cors());

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === "development",
//   })
// );
console.log(filePath);
app.use(express.static(path.join(__dirname, "../src")));
app.get("*", (req, res) => res.sendFile(filePath, "/index.html"));

app.listen(port, console.log(`Server running on port ${port}`));
