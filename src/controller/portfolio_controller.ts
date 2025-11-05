import { Request, Response } from "express";
import Portfolio from "../Model/portfolio_model";
import { IPortfolio } from "../interface/all_interface";
import { errorHandling } from "../error/errorhandling";

export const create_project = async (req: Request<{}, {}, IPortfolio>,res: Response): Promise<void> => {
  try {
    const data = req.body;
    // uopload image check db product is not present then upload img
    const newPortfolio = await Portfolio.create(data);
    res.status(201).send({status: "success", data: newPortfolio});
  } 
  catch (error: any) {errorHandling(error,res);}
};


// get api  // filter delete product , active product 
// delete project
// update img only 
// update data but not updated img
