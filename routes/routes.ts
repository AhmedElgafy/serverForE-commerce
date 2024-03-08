import { Router, Request, Response } from "express";
import { product } from "../db/schema";
const route = Router();
route.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.send("welcome");
});
//view the body.
route.get("/seeBody", (req: Request, res: Response) => {
  try {
    res.status(200);
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send("some thing wrong with your body request");
  }
});
//Get all cards items
route.get("/allcardsitems", async (req: Request, res: Response) => {
  try {
    res.status(200);
    res.type("json");
    const data = await product.aggregate([
      {
        $project: {
          name: "$name",
          price: "$price",
          // image: { $arrayElemAt: ["$images.data", 0] },
          categories: "$categories",
        },
      },
      // { $limit: 1 },
    ]);
    res.send(data);
  } catch (error) {
    console.log("************ DB error ***********");
    console.log(error);
    res.status(404);
    res.send("error with the query");
  }
});
route.get("/product/:id/image", async (req: Request, res: Response) => {
  try {
    res.status(200);
    res.type("json");
    const data = await product.findById(req.params.id).select("images.data");
    // console.log(data);
    res.send(data?.images[0]);
    res.end();
  } catch (error) {
    console.log("************ DB error ***********");
    console.log(error);
    res.status(404);
    res.send("error with the query");
  }
});
route.get("/product/:id/images", async (req: Request, res: Response) => {
  try {
    res.status(200);
    res.type("json");
    const data = await product.findById(req.params.id).select("images.data");
    // console.log(data);
    res.send(data);
    res.end();
  } catch (error) {
    console.log("************ DB error ***********");
    console.log(error);
    res.status(404);
    res.send("error with the query");
  }
});
route.get("/product/:id", async (req: Request, res: Response) => {
  try {
    res.status(200);
    res.type("json");
    const data = await product.findById(req.params.id);
    // .select("-images.data");
    res.send(data);
  } catch (error) {
    console.log("************ DB error ***********");
    console.log(error);
    res.status(404);
    res.send("error with the query");
  }
});

//Not Found.
route.use("*", (req: Request, res: Response) => {
  res.status(404);
  res.send("Not found");
});
export default route;
