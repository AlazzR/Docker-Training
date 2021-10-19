import expres, {Express, Request, Response} from "express";
import cors from "cors";

const app: Express = expres();


//middleware
app.use(expres.json());
app.use(cors());

app.get("/api/books", async(req: Request, res: Response)=>{
    return res.status(200).json({
        id: 1,
        name: "Animal Farm",
        author: "George orwell"
    });
});

export default app;
