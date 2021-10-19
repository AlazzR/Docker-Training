import express, {Express, Request, Response} from "express";
import { Sequelize, DataTypes } from "sequelize";
import hbs from "hbs";
import path from "path";
import cors from "cors";
import axios from "axios";

console.log(process.env.DBNAME as string); 
console.log(process.env.DBUSERNAME as string); 
console.log(process.env.DBPASSWORD as string); 
console.log(process.env.DBNAME as string); 
const sequelize = new Sequelize(process.env.DBNAME as string, process.env.DBUSERNAME as string, process.env.DBPASSWORD as string, {
    host: process.env.DBHOST,
    dialect: "postgres",
    port: 5432
});

(()=>{
    sequelize.authenticate().then((res)=>console.log(`worked ${res}`)).catch(err => console.log(`db: ${err}`));
})();

const User = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    schema: "U",
    timestamps: false
});

const app: Express = express();


//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));//to serve static files i.e css, js, ..
app.use(cors());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views/"));
hbs.registerPartials(path.join(__dirname, "../templates/partials/"));

//notice that we are using the port of the hose machine not the what is exposed by the container
app.get("/", async(req: Request, res: Response)=>{
    const book = await axios({
        baseURL: "http://localhose:3001",
        url: "/api/books",
        method: "GET"
    });
    return res.send(book);
});

app.get("/users", async(req: Request, res: Response)=>{
    const users = await User.findAll();
    return res.status(200).json(users);
})
export default app;