const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const cloudinary = require("cloudinary");
const acceptMultimedia = require("connect-multiparty");

const app = express();

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

app.use(acceptMultimedia());

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

connectDB();

app.use(express.json());




app.use('/api/user', require("./routes/userRoute"))

app.use("/api/product", require("./routes/productRoute"));


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`The server is up & running on port ${PORT}`)
})