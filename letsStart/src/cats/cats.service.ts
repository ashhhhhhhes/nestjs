import { Response, Request } from "express";
import { Cat, CatType } from "./cats.model";

//* READ 고양이 전체 데이터 다 조회
export const readAllCat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message,
    });
  }
};

//* READ 특정 고양이 데이터 조회
export const readCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cat = Cat.find((cat) => cat.id === id);

    res.status(200).send({
      success: true,
      data: {
        cat,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message,
    });
  }
};

//* CREATE 새로운 고양이 생성 api
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;

    Cat.push(data);

    res.status(200).send({
      success: true,
      data: {
        data,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message,
    });
  }
};

// * upadte
export const updateCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = body;
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        result,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message,
    });
  }
};

// * upadte
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...body };
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        result,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message,
    });
  }
};

// * delete
export const deleteCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newCat = Cat.filter((cat) => cat.id !== id);

    res.status(200).send({
      success: true,
      data: {
        newCat,
      },
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message,
    });
  }
};
