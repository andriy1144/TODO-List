import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

//Congiration of env
dotenv.config();

//Configuration of express.js and its middlewares
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));


//REQUESTS
app.get("/", (req,res) => {
    res.send("Hello Node!");
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});