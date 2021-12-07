const express = require("express");
const path = require("path")
require("./db/conn");
const User = require("./models/usermessage")
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 50;

//setting the  paths
const staticpath = path.join(__dirname, "../public")
const temppath = path.join(__dirname, "../templates/views")
const partpath = path.join(__dirname, "../templates/partials")



//middlewares
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));

app.set("view engine", "hbs");
app.set("views", temppath);
hbs.registerPartials(partpath);


//routing
// app.get(path,callback)
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.post("/contact", async (req, res) => {


try{
// res.send(req.body);
const userData = new User(req.body);
await userData.Save();
res.status(201).render("/");
} catch(error){
    res.status(500).send(error)
}



})

//server create
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})
