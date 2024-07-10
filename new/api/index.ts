import express from "express";
import userRouter from "./controllers/users";

const api = express();

/*api.use("/", (req, res)=>{
    res.status(200).send("This is the api route");
});*/

api.use("/users", userRouter);

export default api;