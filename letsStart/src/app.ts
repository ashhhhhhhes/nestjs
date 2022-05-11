import * as express from "express";
import { Cat, CatType } from "./cats/cats.model";
import catsRouter from "./cats/cats.router";

const app: express.Application = express();

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    /**
     * logging middleware
     */
    app.use((req: express.Request, res: express.Response, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is middleware");
      next();
    });

    //* JSON middleware
    app.use(express.json());

    this.setRoute();

    //* 404 Error middleware
    app.use((req, res, next) => {
      res.send({ error: "404 Not found error" });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log(`Server is on...`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
