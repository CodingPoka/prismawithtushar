
import express from "express";
import routes from "./route/index.js";

const app=express();

const PORT= process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})

// Routes file


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);


app.listen(PORT,()=>{
    console.log(`Server is runnging successfull on http://localhost:${PORT}`);
})