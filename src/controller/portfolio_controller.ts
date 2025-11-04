import { Request, Response } from "express";
import Portfolio from "../Model/portfolio_model";
import { IPortfolio } from "../interface/all_interface";

export const create_project = async (req: Request<{}, {}, IPortfolio>,res: Response): Promise<void> => {
  try {
    // const data = req.body;
    // const newPortfolio = await Portfolio.create(data);
    res.status(201).send("ok");
  } 
  catch (error: any) {res.status(500).send({ message: error.message });}
};
